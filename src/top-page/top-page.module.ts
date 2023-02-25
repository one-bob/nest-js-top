import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageSchema } from './models/top-page.model';
import { TopPageController } from './top-page.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TopPageModel.name, schema: TopPageSchema },
    ]),
  ],
  controllers: [TopPageController],
})
export class TopPageModule {}
