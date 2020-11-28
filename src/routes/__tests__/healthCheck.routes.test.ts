import * as supertest from 'supertest';
import { getTestApp } from '../../testHelpers/test.helpers';

describe('healthCheck', () => {
  it('responds ok', async () => {
    const app = await getTestApp();
    const response = await supertest(app).get(`/health`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      status: 'ok',
    });
  });
});
