import { Repository } from 'typeorm';
import { Products } from '../entity/products.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Products>;

  beforeEach(async () => {
    repository = new Repository();
    service = new ProductsService(repository);
  });

  describe('add', () => {
    it('should add products in favorites', async () => {
      const result = new Products();
      jest.spyOn(repository, 'save').mockImplementation(async () => result);
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(async () => undefined);

      expect(
        await service.add({
          id: 1,
          title: 'any_title',
          userId: 1,
        }),
      ).toHaveProperty('id');
    });

    it('should return the product if it is already in favorites', async () => {
      const result = new Products();
      jest.spyOn(repository, 'findOne').mockImplementation(async () => result);

      expect(
        await service.add({
          id: 1,
          title: 'any_title',
          userId: 1,
        }),
      ).toHaveProperty('id');
    });
  });
});
