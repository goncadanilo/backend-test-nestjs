import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddProductDto } from '../dtos/add-product.dto';
import { RemoveProductDto } from '../dtos/delete-product.dto';
import { Products } from '../entity/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private repository: Repository<Products>,
  ) {}

  async add(data: AddProductDto): Promise<Products> {
    const productAlreadyExists = await this.findByFavorite(
      data.userId,
      data.productId,
    );

    if (productAlreadyExists) {
      throw new BadRequestException('This product is already in favorites');
    }

    return await this.repository.save(data);
  }

  async delete(data: RemoveProductDto): Promise<void> {
    const product = await this.findByFavorite(data.userId, data.productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.repository.delete(product.id);
  }

  async findByFavorite(userId: number, productId: number): Promise<Products> {
    const pruductFound = await this.repository.findOne({ userId, productId });

    return pruductFound;
  }
}
