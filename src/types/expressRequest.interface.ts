import { Request } from 'express';
import { UserEntity } from '@app/user/user.entity';

// Extend Request from express and add optional property "user"
export interface CustomExpressRequest extends Request {
  user?: UserEntity;
}
