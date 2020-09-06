import { Products } from '../entity/products.entity';

export class AddProductDto {
  productId: Products['productId'];
  title: Products['title'];
  userId: Products['userId'];
}
