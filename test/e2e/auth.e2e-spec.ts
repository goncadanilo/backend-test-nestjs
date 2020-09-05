import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { AuthService } from '../../src/modules/auth/service/auth.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const authService = {
    validateUser: () => {
      return { id: 1, email: 'any@email.com' };
    },
    login: () => {
      return { token: 'any_token' };
    },
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/v1/auth (POST)', () => {
    it('should return 200 when authenticate', () => {
      return request(app.getHttpServer())
        .post('/v1/auth')
        .send({
          email: 'any@email.com',
          password: 'any_password',
        })
        .expect(200);
    });
  });
});
