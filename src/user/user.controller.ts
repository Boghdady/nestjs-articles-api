import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dtos/createUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  createUser(@Body('user') createDto: CreateUserDto): CreateUserDto {
    return this.userService.createUser(createDto);
  }
}
