import * as Winston from 'winston';
import * as Koa from 'koa';
import { LogLevel, RollbarTransport } from '../lib/rollbarTransport';
import { Environment } from '../lib/environment';

const transports: any = [new Winston.transports.Console()];

if (Environment.rollbarAccessToken()) {
  transports.push(
    new RollbarTransport({
      rollbarConfig: {
        environment: Environment.rollbarEnvironment(),
        accessToken: Environment.rollbarAccessToken(),
      },
    })
  );
}

export const koaLogger = (winstonInstance: typeof Winston) => {
  winstonInstance.configure({
    format: Winston.format.combine(Winston.format.json()),
    transports,
  });

  return async (ctx: Koa.Context | any, next: () => Promise<any>) => {
    const start = new Date().getTime();

    await next();

    const ms = new Date().getTime() - start;

    let logLevel: LogLevel;
    if (ctx.status >= 500) {
      logLevel = 'error';
    } else if (ctx.status >= 400) {
      logLevel = 'warn';
    } else if (ctx.status >= 100) {
      logLevel = 'info';
    }

    const msg = {
      req: {
        headers: ctx.request.header,
        url: ctx.request.url,
        originalUrl: ctx.originalUrl,
        method: ctx.request.method,
        params: ctx.params,
        query: ctx.querystring,
        body: ctx.request.body,
      },
      res: {
        statusCode: ctx.response.status,
        message: ctx.response.message,
      },
      level: logLevel,
      startedAt: start,
      responseTime: ms,
    };

    if (Environment.debugApp()) {
      winstonInstance.log(logLevel, JSON.stringify(msg));
    } else if (Environment.rollbarLogLevels().includes(logLevel)) {
      winstonInstance.log(logLevel, JSON.stringify(msg));
    }
  };
};

export const logger = Winston.createLogger({
  format: Winston.format.combine(Winston.format.json()),
  transports,
});
