import * as Koa from 'koa';
import * as Router from 'koa-router';
import { jsonResponseBody } from '../../../lib/json-response';

const getById = async (ctx: Koa.Context, next: () => Promise<any>) => {
  ctx.body = jsonResponseBody({
    id: ctx.params.id
  });
};

export const initExampleRoutes = (router: Router) => {
  router.get('/example/:id', getById);
};
