import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import request from 'supertest';

import { AppModule } from '@/app.module';

describe('Identification (E2E)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();
    jwtService = moduleRef.get(JwtService);

    app.use(cookieParser());
    await app.init();
  });

  test('[GET] /identification/login', async () => {
    const response = await request(app.getHttpServer()).get(
      '/identification/login',
    );
    console.log({ response });
    expect(response.statusCode).toBe(200);
  });

  test('[GET] /identification/private', async () => {
    const token = jwtService.sign({ id: 1 });
    const responseSuccess = await request(app.getHttpServer())
      .get('/identification/private')
      .set('Cookie', [`access_token=${token}`])
      .send();

    const responseError = await request(app.getHttpServer())
      .get('/identification/private')
      .send();

    expect(responseSuccess.body).toEqual(
      expect.objectContaining({
        privateEndpoint: true,
        message: 'hello world',
      }),
    );
    expect(responseSuccess.statusCode).toBe(200);
    expect(responseError.statusCode).toBe(401);
  });
});
