import * as cors from '@koa/cors';
import { unauthorized } from '@hapi/boom';
import { Config } from '../config';

export const isAllowedCorsOrigin = (origin: string) => {
  const additionalOrigins = Config.allowedOrigins()
    .filter((o) => {
      if (!o || o === '') {
        return false;
      }
      return true;
    })
    .map((v) => v.trim());
  const dynamicPass =
    origin && Config.dynamicOrigins().some((domain) => origin.match(domain) !== null);
  if (origin === undefined || dynamicPass || additionalOrigins.includes(origin)) {
    return true;
  }
  return false;
};

export const corsRules: cors.Options = {
  origin: (ctx) => {
    const origin = ctx.get('Origin');
    if (isAllowedCorsOrigin(origin)) {
      return '*';
    }
    throw unauthorized('Cross-Origin Request Blocked');
  },
};
