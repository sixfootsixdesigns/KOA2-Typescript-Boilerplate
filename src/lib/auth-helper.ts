import * as jsonwebtoken from 'jsonwebtoken';

const getAuthorizationToken = (payload = {}) => {
  return 'Bearer ' + jsonwebtoken.sign(payload, process.env.AUTH_SECRET);
};

export { getAuthorizationToken };
