import * as nock from 'nock';

export const jwksEndpoint = (host: string, certs: any) => {
  return nock(host)
    .get('/.well-known/jwks.json')
    .reply(200, {
      keys: certs.map((cert: any) => {
        return {
          alg: 'RS256',
          kty: 'RSA',
          use: 'sig',
          x5c: [
            /-----BEGIN CERTIFICATE-----([^-]*)-----END CERTIFICATE-----/g
              .exec(cert.pub)[1]
              .replace(/[\n|\r\n]/g, ''),
          ],
          kid: cert.kid,
        };
      }),
    });
};
