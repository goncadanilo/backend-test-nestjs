import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpService,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AddProductDto } from '../dtos/add-product.dto';
import { ProductsService } from '../service/products.service';

@Controller('v1/products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private http: HttpService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':productId')
  @HttpCode(200)
  async add(@Param('productId') productId: string, @Request() req: any) {
    const product = await this.http
      .get(
        `https://${process.env.SHOPIFY_API_KEY}:${process.env.SHOPIFY_API_KEY}@${process.env.SHOPIFY_BASE_URL}/${productId}.json`,
      )
      .toPromise()
      .then(res => res.data.product)
      .catch(() => {
        throw new NotFoundException('Product not found');
      });

    const data: AddProductDto = {
      productId: product.id,
      title: product.title,
      userId: req.user.id,
    };

    return await this.productsService.add(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  async findByUserId(@Request() req: any) {
    return await this.productsService.findByUserId(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':productId')
  @HttpCode(204)
  async delete(@Param('productId') productId: string, @Request() req: any) {
    return await this.productsService.delete({
      productId: Number(productId),
      userId: req.user.id,
    });
  }
}
