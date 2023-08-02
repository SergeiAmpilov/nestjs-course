import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from 'src/auth/auth.constants';

const productId = new Types.ObjectId().toHexString();

const loginDto: AuthDto = {
  login: 'ampilov@list.ru',
  password: '123456'
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    
  });

  /* */

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login/')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        const token = body.access_token
        expect(token).toBeDefined();
      });
  });


  it('/auth/login (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/auth/login/')
      .send({
        ...loginDto,
        login:'some_random@login.com'
      })
      .expect(401, {
        statusCode: 401,
        error: 'Unauthorized',
        message: USER_NOT_FOUND_ERROR
      });
  });

  it('/auth/login (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/auth/login/')
      .send({
        ...loginDto,
        password:'some_random_password123'
      })
      .expect(401, {
        statusCode: 401,
        error: 'Unauthorized',
        message: WRONG_PASSWORD_ERROR
      });
  });



  afterAll(() => {
    disconnect()
  });
});
