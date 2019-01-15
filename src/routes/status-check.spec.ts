import * as supertest from 'supertest';
import { getTestApp } from '../lib/test-setup';
import * as http from 'http';

describe('GET /status-check', () => {
  let app: http.Server;

  before(() => {
    app = getTestApp();
  });

  it('should respond that it is Alive', async () => {
    await supertest(app)
      .get('/status-check')
      .expect(200, `app is up`);
  });

  after(() => {
    app.close();
  });
});
