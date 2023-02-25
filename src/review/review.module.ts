import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/product/models/product.model';
import { ReviewModel } from './models/review.model';
import { ReviewController } from './review.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReviewModel.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ReviewController],
})
export class ReviewModule {}
