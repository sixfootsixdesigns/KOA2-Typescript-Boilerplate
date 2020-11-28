import * as Router from 'koa-router';
import { checkJwt } from '../../middleware/auth';
import { flowRoutes } from './example/example.routes';

const apiRouter = new Router({
  prefix: '/api',
});

apiRouter.use(checkJwt, flowRoutes.routes());

export { apiRouter };
