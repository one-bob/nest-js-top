import { disconnect, Types } from 'mongoose';
import { CreateReviewDto } from './../src/review/dto/create-review.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const productId = new Types.ObjectId().toHexString();

const testReviewDto: CreateReviewDto = {
  name: 'test',
  title: 'title',
  description: 'desc',
  rating: 5,
  productId,
};

describe('ReviewController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/review/create ')
      .send(testReviewDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
      });
  });

  it('/review/create (POST) fail', () => {
    return request(app.getHttpServer())
      .post('/review/create ')
      .send({
        ...testReviewDto,
        rating: 0,
      })
      .expect(400);
  });

  it('/review/byProduct (GET)', async () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + createdId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
      });
  });

  it('/review/:id (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .expect(200);
  });

  afterAll(() => {
    disconnect();
  });
});
