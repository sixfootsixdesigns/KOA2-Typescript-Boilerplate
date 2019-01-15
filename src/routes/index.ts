import * as Router from 'koa-router';
import { initApiRoutes } from './api';
import { initStatusRoutes } from './status-check';

const initRoutes = (rootRouter: Router) => {
  // init api routes
  initApiRoutes(rootRouter);

  // status check route
  initStatusRoutes(rootRouter);
};

export { initRoutes };
