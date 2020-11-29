import * as jwksRsa from 'jwks-rsa';
import * as jwt from 'koa-jwt';
import { Config } from '../config';

export const checkJwt = jwt({
  secret: jwksRsa.koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: Config.authJwksUri(),
  }),
  issuer: Config.authIssuers(),
  audience: Config.authAudience(),
  algorithms: ['RS256'],
});
