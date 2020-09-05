import { hashSync } from 'bcryptjs';
import { Repository } from 'typeorm';
import { Users } from '../../users/entity/users.entity';
import { UsersService } from '../../users/service/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let repository: Repository<Users>;

  beforeEach(async () => {
    repository = new Repository();
    userService = new UsersService(repository);
    authService = new AuthService(userService);
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
      ).toStrictEqual({ id: 1, name: 'any_name', email: 'any@email.com' });
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
});
