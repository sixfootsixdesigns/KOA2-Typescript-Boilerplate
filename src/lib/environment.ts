export class Environment {
  public static getAdditionalOrigins() {
    return (process.env.ADDITIONAL_ORIGINS || '').split(',');
  }

  public static authIssuers() {
    return (process.env.AUTH_ISSUER || '').split(',').map((v) => v.trim());
  }

  public static authJwksUri() {
    const uri =
      process.env.NODE_ENV === 'test' ? 'http://auth.test' : `https://${process.env.AUTH_DOMAIN}`;
    return `${uri}/.well-known/jwks.json`;
  }

  public static authAudience() {
    return (process.env.AUTH_AUDIENCE || '').split(',').map((v) => v.trim());
  }

  public static rollbarLogLevels() {
    return process.env.ROLLBAR_LOG_LEVELS
      ? process.env.ROLLBAR_LOG_LEVELS.split(',')
      : ['warn', 'error', 'critical'];
  }

  public static debugApp() {
    return process.env.DEBUG_APP === 'true';
  }

  public static rollbarAccessToken() {
    return process.env.ROLLBAR_ACCESS_TOKEN;
  }

  public static rollbarEnvironment() {
    return process.env.ROLLBAR_ENVIRONMENT || 'production';
  }
}
