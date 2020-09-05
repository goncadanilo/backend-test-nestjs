import { JwtService } from '@nestjs/jwt';
import { hashSync } from 'bcryptjs';
import { Repository } from 'typeorm';
import { Users } from '../../users/entity/users.entity';
import { UsersService } from '../../users/service/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let repository: Repository<Users>;
  let jwtService: JwtService;

  beforeEach(async () => {
    repository = new Repository();
    userService = new UsersService(repository);
    jwtService = new JwtService({ secret: 'any_secret_key' });
    authService = new AuthService(userService, jwtService);
  });

  describe('validateUser', () => {
    it('should validate user', async () => {
      const result = new Users();
      result.password = hashSync('any_password', 8);
      result.id = 1;
      result.name = 'any_name';
      result.email = 'any@email.com';

      jest
        .spyOn(userService, 'findByEmail')
        .mockImplementation(async () => result);

      expect(
        await authService.validateUser('any@email.com', 'any_password'),
      ).toStrictEqual({ id: 1, email: 'any@email.com' });
    });

    it('should return null when an incorrect email is provided', async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockImplementation(async () => undefined);

      expect(
        await authService.validateUser('any@email.com', 'any_password'),
      ).toBe(null);
    });

    it('should return null when an incorrect password is provided', async () => {
      const result = new Users();
      result.password = hashSync('any_password', 8);

      jest
        .spyOn(userService, 'findByEmail')
        .mockImplementation(async () => result);

      expect(
        await authService.validateUser('any@email.com', 'another_password'),
      ).toBe(null);
    });
  });

  describe('login', () => {
    it('shoult return an authentication token', async () => {
      expect(
        await authService.login({ email: 'any@email.com', userId: 'any_id' }),
      ).toHaveProperty('token');
    });
  });
});
