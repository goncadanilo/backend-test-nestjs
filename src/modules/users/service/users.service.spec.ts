import { Repository } from 'typeorm';
import { Users } from '../entity/users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<Users>;

  beforeEach(async () => {
    repository = new Repository();
    service = new UsersService(repository);
  });

  describe('store', () => {
    it('should store user', async () => {
      const result = new Users();
      jest.spyOn(repository, 'save').mockImplementation(async () => result);

      expect(
        await service.store({
          name: 'any_name',
          email: 'any@email.com',
          password: 'any_password',
        }),
      ).toBe(result.id);
    });
  });
});
