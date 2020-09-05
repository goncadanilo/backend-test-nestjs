import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { UsersService } from '../../src/modules/users/service/users.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const usersService = { store: () => 1 };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/v1/users (POST)', () => {
    it('should return 201 when user is created', () => {
      return request(app.getHttpServer())
        .post('/v1/users')
        .send({
          name: 'any_name',
          email: 'any@email.com',
          password: 'any_password',
        })
        .expect(201);
    });
  });
});
