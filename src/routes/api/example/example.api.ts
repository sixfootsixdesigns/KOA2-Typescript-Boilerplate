import * as Koa from 'koa';
import * as Router from 'koa-router';
import { jsonResponseBody } from '../../../lib/json-response';
import { exampleData } from '../../../db/data/example';
import { firstOrFail } from '../../../lib/first-or-fail';

const getById = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const id = ctx.params.id;
  const result = await exampleData.getById(id);
  ctx.body = jsonResponseBody(firstOrFail(ctx, result));
};

const updateById = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const record = ctx.request.body;
  const id = ctx.params.id;
  const result = await exampleData.update(id, record);
  ctx.body = jsonResponseBody(firstOrFail(ctx, result));
};

const softDelete = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const id = ctx.params.id;
  const result = await exampleData.softDelete(id);
  ctx.body = jsonResponseBody(firstOrFail(ctx, result));
};

const restore = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const id = ctx.params.id;
  const result = await exampleData.restore(id);
  ctx.body = jsonResponseBody(firstOrFail(ctx, result));
};

const create = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const record = ctx.request.body;
  const body = await exampleData.create(record);
  ctx.body = jsonResponseBody(body);
};

const getAll = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const body = await exampleData.all();
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
