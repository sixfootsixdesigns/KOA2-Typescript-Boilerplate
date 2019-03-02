import * as supertest from 'supertest';
import * as http from 'http';
import { getTestApp, closeApp } from '../../../lib/test-setup';
import { expect } from 'chai';
import { getAuthorizationToken } from '../../../lib/auth-helper';
import { exampleData } from '../../../db/data/example';

describe('Site Routes', () => {
  let app: http.Server;

  before(async () => {
    app = await getTestApp();
  });

  describe('GET /example/:id', () => {
    let record = null;
    beforeEach(async () => {
      const result = await exampleData.create({
        name: 'foo'
      });
      record = result[0];
    });

    it('should 401 without auth', async () => {
      const resp = await supertest(app).get('/api/example/1');
      expect(resp.status).to.equal(401);
    });

    it('should 401 with bad auth', async () => {
      const resp = await supertest(app)
        .get('/api/example/1')
        .set('Authorization', getAuthorizationToken() + 'f');
      expect(resp.status).to.equal(401);
    });

    it('should 404 if deleted', async () => {
      await exampleData.softDelete(record.id);
      await supertest(app)
        .get(`/api/example/${record.id}`)
        .set('Authorization', getAuthorizationToken())
        .expect(404);
    });

    it('should 404 if not found', async () => {
      await supertest(app)
        .get(`/api/example/${record.id}234234`)
        .set('Authorization', getAuthorizationToken())
        .expect(404);
    });

    it('should respond with site by id', async () => {
      const resp = await supertest(app)
        .get(`/api/example/${record.id}`)
        .set('Authorization', getAuthorizationToken())
        .expect(200);
      expect(resp.body.data.id).to.equal(record.id);
      expect(resp.body.data.name).to.equal(record.name);
    });
  });

  after(async () => {
    closeApp();
  });
});
