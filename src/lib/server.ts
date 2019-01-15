import * as cors from '@koa/cors';
import * as http from 'http';
import * as Koa from 'koa';
import * as koa404Handler from 'koa-404-handler';
import * as errorHandler from 'koa-better-error-handler';
import * as bodyParser from 'koa-bodyparser';
import * as compress from 'koa-compress';
import * as helmet from 'koa-helmet';
import * as Router from 'koa-router';
import { corsRules } from '../middleware/cors';
import { initRoutes } from '../routes';
import * as jwt from 'koa-jwt';

export const createServer = (): http.Server => {
  const app = new Koa();
  const rootRouter = new Router();

  initRoutes(rootRouter);

  // override koa's undocumented error handler
  app.context.onerror = errorHandler;

  app
    // 404 handler
    .use(koa404Handler)

    // Security headers
    .use(helmet())

    // Handle CORS
    .use(
      cors({
        origin: corsRules
      })
    )

    // handle JWT (you can access the payload from ctx.state.user )
    .use(
      jwt({
        secret: process.env.AUTH_SECRET
      }).unless({
        path: [/^\/status-check/]
      })
    )

    // Compress all responses.
    .use(compress())

    // Parses request bodies
    .use(bodyParser())

    // mount rootRouter
    .use(rootRouter.routes())
    .use(rootRouter.allowedMethods());

  const server = http.createServer(app.callback());

  server.on('close', () => {
    // server is closing you can do stuff
  });

  return server;
};
