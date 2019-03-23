import * as supertest from 'supertest';
import * as http from 'http';
import { getTestApp, closeApp } from '../../../helpers/test-setup';
import { expect } from 'chai';
import { getAuthorizationToken } from '../../../lib/auth-helper';
import { exampleData } from '../../../db/data/example';

describe('/api/example/', () => {
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
      const resp = await supertest(app).get(`/api/example/${record.id}`);
      expect(resp.status).to.equal(401);
    });

    it('should 401 with bad auth', async () => {
      const resp = await supertest(app)
        .get(`/api/example/${record.id}`)
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

    it('should respond with id', async () => {
      const resp = await supertest(app)
        .get(`/api/example/${record.id}`)
        .set('Authorization', getAuthorizationToken())
        .expect(200);
      expect(resp.body.data.id).to.equal(record.id);
    });
  });

  describe('PUT /restore/:id', () => {
    let record = null;
    beforeEach(async () => {
      const result = await exampleData.create({
        name: 'foo'
      });
      record = result[0];
      await exampleData.softDelete(record.id);
    });

    it('should 401 without auth', async () => {
      const resp = await supertest(app).put(
        `/api/example/restore/${record.id}`
      );
      expect(resp.status).to.equal(401);
    });

    it('should 401 with bad auth', async () => {
      const resp = await supertest(app)
        .put(`/api/example/restore/${record.id}`)
        .set('Authorization', getAuthorizationToken() + 'f');
      expect(resp.status).to.equal(401);
    });

    it('should 404 if not found', async () => {
      await supertest(app)
        .put(`/api/example/restore/${record.id}234234`)
        .set('Authorization', getAuthorizationToken())
        .expect(404);
    });

    it('should un delete record', async () => {
      const resp = await supertest(app)
        .put(`/api/example/restore/${record.id}`)
        .set('Authorization', getAuthorizationToken())
        .expect(200);
      expect(resp.body.data.id).to.equal(record.id);

      const data = await exampleData.getById(record.id);
      expect(data.deleted_at).to.equal(null);
    });
  });

  describe('PUT /update/:id', () => {
    let record = null;
    beforeEach(async () => {
      const result = await exampleData.create({
        name: 'foo'
      });
      record = result[0];
    });

    it('should 401 without auth', async () => {
      const resp = await supertest(app)
        .put(`/api/example/update/${record.id}`)
        .send({
          name: 'bar'
        });
      expect(resp.status).to.equal(401);
    });

    it('should 401 with bad auth', async () => {
      const resp = await supertest(app)
        .put(`/api/example/update/${record.id}`)
        .send({
          name: 'bar'
        })
        .set('Authorization', getAuthorizationToken() + 'f');
      expect(resp.status).to.equal(401);
    });

    it('should 404 if not found', async () => {
      await supertest(app)
        .put(`/api/example/update/${record.id}23423`)
        .send({
          name: 'bar'
        })
        .set('Authorization', getAuthorizationToken())
        .expect(404);
    });

    it('should update record', async () => {
      const resp = await supertest(app)
        .put(`/api/example/update/${record.id}`)
        .send({
          name: 'bar'
        })
        .set('Authorization', getAuthorizationToken())
        .expect(200);
      expect(resp.body.data.id).to.equal(record.id);

      const data = await exampleData.getById(record.id);
      expect(data.name).to.equal('bar');
    });
  });

  describe('POST /create', () => {
    it('should 401 without auth', async () => {
      const resp = await supertest(app)
        .post(`/api/example/create`)
        .send({
          name: 'bar'
        });
      expect(resp.status).to.equal(401);
    });

    it('should 401 with bad auth', async () => {
      const resp = await supertest(app)
        .post(`/api/example/create`)
        .send({
          name: 'bar'
        })
        .set('Authorization', getAuthorizationToken() + 'f');
      expect(resp.status).to.equal(401);
    });

    it('should create record', async () => {
      const resp = await supertest(app)
        .post(`/api/example/create`)
        .send({
          name: 'bar'
        })
        .set('Authorization', getAuthorizationToken())
        .expect(201);
      expect(resp.body.data.id).not.to.equal(undefined);
    });
  });

  describe('DELETE /soft-delete/:id', () => {
    let record = null;
    beforeEach(async () => {
      const result = await exampleData.create({
        name: 'foo'
      });
      record = result[0];
    });

    it('should 401 without auth', async () => {
      const resp = await supertest(app).delete(
        `/api/example/soft-delete/${record.id}`
      );
      expect(resp.status).to.equal(401);
    });

    it('should 401 with bad auth', async () => {
      const resp = await supertest(app)
        .delete(`/api/example/soft-delete/${record.id}`)
        .set('Authorization', getAuthorizationToken() + 'f');
      expect(resp.status).to.equal(401);
    });

    it('should 404 if not found', async () => {
      await supertest(app)
        .delete(`/api/example/soft-delete/${record.id}234`)
        .set('Authorization', getAuthorizationToken())
        .expect(404);
    });

    it('should soft delete record', async () => {
      const resp = await supertest(app)
        .delete(`/api/example/soft-delete/${record.id}`)
        .set('Authorization', getAuthorizationToken())
        .expect(200);
      expect(resp.body.data.id).to.equal(record.id);

      const data = await exampleData.getById(record.id, true);
      expect(data.deleted_at).not.to.equal(null);
    });
  });

  after(async () => {
    closeApp();
  });
});
