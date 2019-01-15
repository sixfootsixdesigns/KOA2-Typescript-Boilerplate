import * as Koa from 'koa';
import * as Router from 'koa-router';
import { jsonResponseBody } from '../../../lib/json-response';
import { sitesData } from '../../../db/data/example';

const getById = async (ctx: Koa.Context, next: () => Promise<any>) => {
  ctx.body = jsonResponseBody({
    id: ctx.params.id
  });
};

const updateById = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const record = ctx.request.body;
  const id = ctx.params.id;
  const body = await sitesData.update(id, record);
  ctx.body = jsonResponseBody(body);
};

const softDelete = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const id = ctx.params.id;
  const body = await sitesData.softDelete(id);
  ctx.body = jsonResponseBody(body);
};

const restore = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const id = ctx.params.id;
  const body = await sitesData.restore(id);
  ctx.body = jsonResponseBody(body);
};

const create = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const record = ctx.request.body;
  const body = await sitesData.create(record);
  ctx.body = jsonResponseBody(body);
};

const getAll = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const body = await sitesData.all();
  ctx.body = jsonResponseBody(body);
};

export const initExampleRoutes = (router: Router) => {
  router.post('/example/create', create);
  router.put('/example/restore/:id', restore);
  router.put('/example/update/:id', updateById);
  router.get('/example/get-all', getAll);
  router.get('/example/:id', getById);
  router.delete('/example/delete/:id', softDelete);
};
