import * as Koa from 'koa';
import * as Router from 'koa-router';

const statusCheck = async (ctx: Koa.Context, next: () => Promise<any>) => {
  ctx.body = `app is up`;
};

export const initStatusRoutes = (router: Router) => {
  router.get('/status-check', statusCheck);
};
