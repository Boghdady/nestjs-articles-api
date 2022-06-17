import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dtos/createUser.dto';
import { UserEntity } from '@app/user/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  createUser(@Body('user') createDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createDto);
  }
}
