import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductSchema } from './models/product.model';
import { ProductController } from './product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
