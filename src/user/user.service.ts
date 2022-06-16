import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dtos/createUser.dto';

@Injectable()
export class UserService {
  createUser(createUserDto: CreateUserDto): CreateUserDto {
    return createUserDto;
  }
}
