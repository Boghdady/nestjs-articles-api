import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dtos/createUser.dto';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { LoginDto } from './dtos/login.dto';
import { CustomExpressRequest } from '@app/types/expressRequest.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users/register')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginDto: LoginDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('users/me')
  async currentUser(
    @Req() req: CustomExpressRequest,
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(req.user);
  }
}
