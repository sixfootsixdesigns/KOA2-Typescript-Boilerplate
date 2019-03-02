import * as supertest from 'supertest';
import { getTestApp, closeApp } from '../lib/test-setup';
import * as http from 'http';

describe('GET /status-check', () => {
  let app: http.Server;

  before(async () => {
    app = await getTestApp();
  });

  it('should respond that it is Alive', async () => {
    await supertest(app)
      .get('/status-check')
      .expect(200, `app is up`);
  });

  after(() => {
    closeApp();
  });
});
