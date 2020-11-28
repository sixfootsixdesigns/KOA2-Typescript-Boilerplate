import { Boom } from '@hapi/boom';
import * as Koa from 'koa';
import { ValidationError } from 'class-validator';

const processArrayError = (ctx: Koa.Context, errs: ValidationError[] | Error[]) => {
  const msg: string[] = [];
  let status = 500;
  errs.forEach((ex: ValidationError | Error) => {
    if (ex instanceof ValidationError) {
      status = 422;
      msg.push(ex.toString());
    } else {
      msg.push(ex.message);
    }
  });
  ctx.status = status;
  ctx.body = new Boom(msg.join(''), { statusCode: status }).output.payload;
};

export const errorHandler = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next();
  } catch (err) {
    if (Array.isArray(err)) {
      processArrayError(ctx, err);
    } else if (err instanceof ValidationError) {
      ctx.status = 422;
      ctx.body = new Boom(err.toString(), { statusCode: ctx.status }).output.payload;
    } else if (err.isBoom) {
      ctx.status = err.output.statusCode;
      ctx.body = err.output.payload;
    } else if (err.name === 'EntityNotFound') {
      ctx.status = 404;
      ctx.body = new Boom('Could not find object', { statusCode: ctx.status }).output.payload;
    } else {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = new Boom(err.message, { statusCode: ctx.status }).output.payload;
    }
  }
};
