import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddProductDto } from '../dtos/add-product.dto';
import { Products } from '../entity/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private repository: Repository<Products>,
  ) {}

  async add(data: AddProductDto): Promise<Products> {
    const productAlreadyExists = await this.repository.findOne({
      where: { userId: data.userId, productId: data.productId },
    });

    if (productAlreadyExists) {
      throw new BadRequestException('This product is already in favorites');
    }

    return await this.repository.save(data);
  }
}
