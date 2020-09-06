import { BadRequestException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
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
        .spyOn(service, 'findByFavorite')
        .mockImplementation(async () => undefined);

      expect(
        await service.add({
          productId: 1,
          title: 'any_title',
          userId: 1,
        }),
      ).toBe(result);
    });

    it('should not add products in favorites if it is already in favorites', async () => {
      const result = new Products();
      jest
        .spyOn(service, 'findByFavorite')
        .mockImplementation(async () => result);

      try {
        await service.add({
          productId: 1,
          title: 'any_title',
          userId: 1,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('This product is already in favorites');
      }
    });
  });

  describe('delete', () => {
    it('should remove products from favorites', async () => {
      const deleted = new DeleteResult();
      const result = new Products();
      result.id = 1;

      jest
        .spyOn(service, 'findByFavorite')
        .mockImplementation(async () => result);

      const deleteSpy = jest
        .spyOn(repository, 'delete')
        .mockImplementation(async () => deleted);

      await service.delete({ productId: 1, userId: 1 });
      expect(deleteSpy).toBeCalledWith(1);
    });
  });
});
