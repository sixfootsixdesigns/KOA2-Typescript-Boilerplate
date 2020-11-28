import * as supertest from 'supertest';
import { getTestApp, closeTestApp } from '../../../../testHelpers/test.helpers';
import { createToken } from '../../../../testHelpers/token';
import { privateKey, publicKey } from '../../../../testHelpers/keys';
import { jwksEndpoint } from '../../../../testHelpers/jwks';
import * as http from 'http';
import { ExampleEntity } from '../../../../entity';

describe('Example Routes', () => {
  let app: http.Server;

  beforeEach(async () => {
    app = await getTestApp();
  });

  afterEach(async () => {
    await closeTestApp();
    app = null;
  });

  describe('POST /api/example', () => {
    describe('auth validation', () => {
      it('401 error statusCode with no token', async () => {
        const response = await supertest(app).post(`/api/example`);

        expect(response.status).toEqual(401);
        expect(response.body).toEqual({
          error: 'Unauthorized',
          message: 'Authentication Error',
          statusCode: 401,
        });
      });
    });

    describe('validation', () => {
      it('422 error statusCode when no data', async () => {
        jwksEndpoint('http://auth.test', [{ pub: publicKey, kid: '123' }]);

        const token = createToken(privateKey, '123', {});

        const response = await supertest(app)
          .post(`/api/example`)
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(422);
        expect(response.body).toEqual({
          error: 'Unprocessable Entity',
          message: 'You must send a definition',
          statusCode: 422,
        });
      });

      it('422 error statusCode when no definition', async () => {
        jwksEndpoint('http://auth.test', [{ pub: publicKey, kid: '123' }]);
        const token = createToken(privateKey, '123', {});

        const response = await supertest(app)
          .post(`/api/example`)
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(422);
        expect(response.body).toEqual({
          error: 'Unprocessable Entity',
          message: 'You must send a definition',
          statusCode: 422,
        });
      });
    });

    it('sends definition', async () => {
      jwksEndpoint('http://auth.test', [{ pub: publicKey, kid: '123' }]);
      const token = createToken(privateKey, '123', {});

      const definition = JSON.stringify({ cat: 'hat' });

      const data: Partial<ExampleEntity> = {
        definition,
      };

      const response: { status: number; body: ExampleEntity } = await supertest(app)
        .post(`/api/example`)
        .set('Authorization', `Bearer ${token}`)
        .send(data);

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
      expect(response.body).toHaveProperty('deletedDate');
      expect(response.body.definition).toEqual(definition);
    });
  });

  describe('GET /api/example/:id', () => {
    describe('auth validation', () => {
      it('401 error statusCode with no token', async () => {
        const response = await supertest(app).get(`/api/example/1`);
        expect(response.status).toEqual(401);
        expect(response.body).toEqual({
          error: 'Unauthorized',
          message: 'Authentication Error',
          statusCode: 401,
        });
      });
    });

    it('get record', async () => {
      jwksEndpoint('http://auth.test', [{ pub: publicKey, kid: '123' }]);
      const token = createToken(privateKey, '123', {});
      const definition = JSON.stringify({ cat: 'hat' });
      const record = await ExampleEntity.create({
        definition,
      }).save();

      console.log(record.id);

      const response = await supertest(app)
        .get(`/api/example/${record.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
      expect(response.body).toHaveProperty('deletedDate');
      expect(response.body.definition).toEqual(definition);
    });

    it('get 404', async () => {
      jwksEndpoint('http://auth.test', [{ pub: publicKey, kid: '123' }]);
      const token = createToken(privateKey, '123', {});
      const response = await supertest(app)
        .get(`/api/example/c1be38ed-d591-44d9-8a7e-25e6298b147d`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(404);
    });
  });
});
