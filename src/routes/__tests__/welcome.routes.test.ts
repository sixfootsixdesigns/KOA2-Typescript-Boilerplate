import * as supertest from 'supertest';
import { getTestApp } from '../../testHelpers/test.helpers';

describe('welcome', () => {
  it('responds ok', async () => {
    const app = await getTestApp();
    const response = await supertest(app).get(`/`);

    expect(response.status).toEqual(200);
  });
});
