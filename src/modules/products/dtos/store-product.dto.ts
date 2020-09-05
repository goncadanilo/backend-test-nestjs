import { Products } from '../entity/products.entity';

export class StoreProductDto {
  id: Products['id'];
  title: Products['title'];
  userId: Products['userId'];
}
