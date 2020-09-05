import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BcryptService } from '../../../shared/services/bcrypt.service';
import { Users } from '../entity/users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<Users>;
  let bcrypt: BcryptService;

  beforeEach(async () => {
    repository = new Repository();
    bcrypt = new BcryptService();
    service = new UsersService(repository, bcrypt);
  });

  describe('store', () => {
    it('should store user', async () => {
      const result = new Users();
      jest.spyOn(repository, 'save').mockImplementation(async () => result);
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(async () => undefined);

      expect(
        await service.store({
          name: 'any_name',
          email: 'any@email.com',
          password: 'any_password',
        }),
      ).toBe(result.id);
    });

    it('should not store user with duplicate email', async () => {
      const result = new Users();
      jest.spyOn(repository, 'findOne').mockImplementation(async () => result);

      try {
        await service.store({
          name: 'any_name',
          email: 'any@email.com',
          password: 'any_password',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('User with same email already exists');
      }
    });
  });
});