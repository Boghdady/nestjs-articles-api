import { UserEntity } from '@app/user/user.entity';

// Make a new user type that not contain "hashPassword" property
type UserType = Omit<UserEntity, 'hashPassword'>;

// Add token to user type
export interface UserResponseInterface {
  user: UserType & { token: string };
}
