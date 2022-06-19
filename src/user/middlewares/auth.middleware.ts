import { JWT_SECRET } from '@app/config';
import { CustomExpressRequest } from '@app/types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from '@app/user/user.service';

// We don't handle errors here, "Separation of concerns"
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: CustomExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = verify(token, JWT_SECRET);
      const user = await this.userService.findOne(decoded.id);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
