import { Products } from '../entity/products.entity';

export class RemoveProductDto {
  productId: Products['productId'];
  userId: Products['userId'];
}
