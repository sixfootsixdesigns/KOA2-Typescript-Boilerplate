import * as cors from '@koa/cors';
import { unauthorized } from '@hapi/boom';
import { Environment } from '../lib/environment';

// you can put in regexes here: IE: /^https:\/\/[a-zA-Z-]*.yoursite.com$/
const dynamicOrigins: RegExp[] = [];

export const isAllowedCorsOrigin = (origin: string) => {
  const additionalOrigins = Environment.getAdditionalOrigins()
    .filter((o) => {
      if (!o || o === '') {
        return false;
      }
      return true;
    })
    .map((v) => v.trim());
  const dynamicPass = origin && dynamicOrigins.some((domain) => origin.match(domain) !== null);
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
