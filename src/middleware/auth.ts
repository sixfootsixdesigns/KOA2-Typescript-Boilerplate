import * as jwksRsa from 'jwks-rsa';
import * as jwt from 'koa-jwt';
import { Environment } from '../lib/environment';

export const checkJwt = jwt({
  secret: jwksRsa.koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: Environment.authJwksUri(),
  }),
  issuer: Environment.authIssuers(),
  audience: Environment.authAudience(),
  algorithms: ['RS256'],
});
