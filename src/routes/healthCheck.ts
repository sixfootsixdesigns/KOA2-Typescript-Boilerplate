import { buildResponseBody } from '../lib/response';
import * as Koa from 'koa';
import * as Router from 'koa-router';

const healthCheckRouter = new Router();
healthCheckRouter.get('/health', (ctx: Koa.Context, next: Koa.Next) => {
  ctx.body = buildResponseBody({ status: 'ok' });
});

export { healthCheckRouter };
