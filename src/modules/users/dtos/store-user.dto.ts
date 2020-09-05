import { Users } from '../entity/users.entity';

export class StoreUserDto {
  name: Users['name'];
  email: Users['email'];
  password: Users['password'];
}
