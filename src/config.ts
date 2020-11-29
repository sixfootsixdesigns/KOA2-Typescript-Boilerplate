export class Config {
  /**
   * the port to listen to
   */
  public static port(): number {
    return Number(process.env.PORT || 3000);
  }

  /**
   * The allowed CORS origins
   */
  public static allowedOrigins(): string[] {
    return (process.env.ALLOWED_ORIGINS || '').split(',');
  }

  /**
   * dynamic CORS origins to allow
   */
  public static dynamicOrigins(): RegExp[] {
    // you can return regular expressions here: IE: /^https:\/\/[a-zA-Z-]*.yoursite.com$/
    return [];
  }

  /**
   * The jwt issuers to accept
   */
  public static authIssuers(): string[] {
    return (process.env.AUTH_ISSUER || '').split(',').map((v) => v.trim());
  }

  /**
   * The jwks uri
   */
  public static authJwksUri(): string {
    const uri =
      process.env.NODE_ENV === 'test' ? 'http://auth.test' : `https://${process.env.AUTH_DOMAIN}`;
    return `${uri}/.well-known/jwks.json`;
  }

  /**
   * The jwt audiences to accept
   */
  public static authAudience(): string[] {
    return (process.env.AUTH_AUDIENCE || '').split(',').map((v) => v.trim());
  }

  /**
   * what log levels to send to rollbar
   */
  public static rollbarLogLevels(): string[] {
    return process.env.ROLLBAR_LOG_LEVELS
      ? process.env.ROLLBAR_LOG_LEVELS.split(',')
      : ['warn', 'error', 'critical'];
  }

  /**
   * to log all messages via rollbar
   */
  public static debugApp(): boolean {
    return process.env.DEBUG_APP === 'true';
  }

  /**
   * The rollbar access token
   */
  public static rollbarAccessToken(): string {
    return process.env.ROLLBAR_ACCESS_TOKEN;
  }

  /**
   * The rollbar environment to log to
   */
  public static rollbarEnvironment(): string {
    return process.env.ROLLBAR_ENVIRONMENT || 'production';
  }

  /**
   * return error status codes that you don't want logged in rollbar
   */
  public static ignoreStatusCodes(): number[] {
    return [];
  }
}
