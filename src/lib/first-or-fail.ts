import * as Koa from 'koa';

export const firstOrFail = (ctx: Koa.Context, result: any) => {
  if (!result) {
    ctx.throw(404);
  }
  if (Array.isArray(result) && result.length === 0) {
    ctx.throw(404);
  }
  if (Array.isArray(result) && result.length === 1) {
    return result[0];
  }
  return result;
};
