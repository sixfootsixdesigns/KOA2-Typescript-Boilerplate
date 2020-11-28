import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as Koa from 'koa';
import * as helmet from 'koa-helmet';
import { corsRules } from './middleware/corsRules';
import { koaLogger } from './middleware/logger';
import * as winston from 'winston';
import { errorHandler } from './middleware/errorHandler';
import { healthCheckRouter } from './routes/healthCheck';
import { apiRouter } from './routes/api/api.routes';
import { welcomeRouter } from './routes/welcome.routes';

export const createApp = (): Koa<Koa.DefaultState, Koa.DefaultContext> => {
  const app = new Koa();

  app.use(koaLogger(winston));
  app.use(helmet());
  app.use(errorHandler);
  app.use(cors(corsRules));
  app.use(bodyParser());
  app.use(welcomeRouter.routes()).use(welcomeRouter.allowedMethods());
  app.use(healthCheckRouter.routes()).use(healthCheckRouter.allowedMethods());
  app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

  return app;
};
