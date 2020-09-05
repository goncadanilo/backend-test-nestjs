import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { UsersService } from '../../users/service/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.usersService.findByEmail(userEmail);

    if (user && compareSync(userPassword, user.password)) {
      const { id, name, email } = user;
      return { id, name, email };
    }

    return null;
  }
}
