import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { CreateUserDto } from '@app/user/dtos/createUser.dto';
import { UserEntity } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    // check if email and username exist
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    return await this.userRepository.save(newUser);
  }

  generateJWT(user: UserEntity): string {
    return sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: { ...user, token: this.generateJWT(user) },
    };
  }

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      { email: loginDto.email },
      { select: ['id', 'bio', 'email', 'image', 'username', 'password'] },
    );
    if (!user) {
      throw new HttpException(
        'Credentials are incorrect',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isCorrectPassword = await compare(loginDto.password, user.password);
    if (!isCorrectPassword) {
      throw new HttpException(
        'Credentials are incorrect',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;
    return user;
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }
}
