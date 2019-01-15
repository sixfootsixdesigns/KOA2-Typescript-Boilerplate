import * as Router from 'koa-router';
import { initExampleRoutes } from './example/example.api';

const initApiRoutes = (rootRouter: Router) => {
  const apiRouter = new Router();

  // add all api routes here
  initExampleRoutes(apiRouter);

  rootRouter.use('/api', apiRouter.routes(), apiRouter.allowedMethods());
};

export { initApiRoutes };
