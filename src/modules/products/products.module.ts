import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entity/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
})
export class ProductsModule {}
