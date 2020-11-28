import * as TransportStream from 'winston-transport';
import * as Rollbar from 'rollbar';

interface RollbarTransportOptions extends TransportStream.TransportStreamOptions {
  rollbarConfig: Rollbar.Configuration;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'warning' | 'error' | 'critical';

export class RollbarTransport extends TransportStream {
  public name: string;
  public rollbar: Rollbar;

  constructor(opts?: RollbarTransportOptions) {
    super(opts);
    if (!opts.rollbarConfig.accessToken) {
      throw "winston requires a 'rollbarConfig.accessToken' property";
    }

    const _rollbar = new Rollbar(opts.rollbarConfig);

    this.name = 'rollbarnew';
    this.level = opts.level || 'warn';
    this.rollbar = _rollbar;
  }

  private getMessageFromError(er: Error | undefined) {
    if (er) {
      return `${er.name}: ${er.message}`;
    }
    return undefined;
  }

  private formatMeta(meta: any) {
    return meta;
  }

  public log(info: { level: LogLevel; message: string; [key: string]: any }, callback: any) {
    const { level, meta } = info;
    process.nextTick(() => {
      const message = this.getMessageFromError(meta && meta.error) || info.message;
      const rollbarLevel = level === 'warn' ? 'warning' : level;
      const cb = (err: Error) => {
        if (err) {
          this.emit('error', err);
          return callback(err);
        }
        this.emit('logged');
        return callback(null, true);
      };
      const logMethod = this.rollbar[rollbarLevel] || this.rollbar.log;
      return logMethod.apply(this.rollbar, [message, this.formatMeta(meta), cb]);
    });
  }
}
