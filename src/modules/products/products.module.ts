import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controller/products.controller';
import { Products } from './entity/products.entity';
import { ProductsService } from './service/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
