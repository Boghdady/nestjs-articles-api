import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dtos/createUser.dto';
import { UserEntity } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    return await this.userRepository.save(newUser);
  }

  generateJWT(user: UserEntity): string {
    return `jhsjh8wjhjdhl90082thg${user.id}`;
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: { ...user, token: this.generateJWT(user) },
    };
  }
}
