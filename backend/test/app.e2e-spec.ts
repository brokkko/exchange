import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});



// b.
const value = 0.7 + 0.9;
expect(value).toBe(1.6);

//
// c.
// expect('команда').not.toMatch(/с/);
//
//
// const value = 0.4 + 0.2;
// expect(value).toBeCloseTo(0.6);
//
//
//
// const value = 2 + 2;
// expect(value).toBe(4);
