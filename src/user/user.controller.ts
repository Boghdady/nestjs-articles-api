import { Controller, Post } from '@nestjs/common';
import { UserService } from '@app/user/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  createUser(): string {
    return this.userService.createUser();
  }
}
