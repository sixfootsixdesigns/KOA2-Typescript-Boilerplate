import * as jwt from 'jsonwebtoken';

export const createToken = (key: string, kid: string, payload: any) => {
  return jwt.sign(payload, key, {
    noTimestamp: true,
    algorithm: 'RS256',
    issuer: 'https://auth.auth0.com/',
    audience: 'https://auth0.com',
    header: { alg: 'RS256', kid },
  });
};

export const createSymmetricToken = (key: string, payload: any) => {
  return jwt.sign(payload, key, {
    noTimestamp: true,
    algorithm: 'HS256',
    issuer: 'https://auth.auth0.com/',
    audience: 'https://auth0.com',
    header: { alg: 'HS256' },
  });
};
