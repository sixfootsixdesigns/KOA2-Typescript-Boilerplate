import * as supertest from 'supertest';
import * as http from 'http';
import { getTestApp } from '../../../lib/test-setup';
import { expect } from 'chai';
import { getAuthorizationToken } from '../../../lib/auth-helper';

describe('Site Routes', () => {
  let app: http.Server;

  before(async () => {
    app = getTestApp();
  });

  describe('GET /example/:id', () => {
    it('should 401 without auth', async () => {
      const resp = await supertest(app)
        .get('/api/example/1');
      expect(resp.status).to.equal(401);
    });

    it('should 401 with bad auth', async () => {
      const resp = await supertest(app)
        .get('/api/example/1')
        .set('Authorization', getAuthorizationToken() + 'f');
      expect(resp.status).to.equal(401);
    }); 

    it('should respond with site by id', async () => {
      const resp = await supertest(app)
        .get('/api/example/1')
        .set('Authorization', getAuthorizationToken())
        .expect(200);
      expect(resp.body.data.id).to.equal('1');
    });
  });

  after(async () => {
    app.close();
  });
});
