import Pino, { Logger, LoggerOptions } from 'pino';

export const loggerOptions: LoggerOptions = {
  level: 'info',
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: { colorize: true },
        level: 'info',
      },
      {
        target: 'pino-loki',
        options: {
          host: 'http://localhost:3100',
          labels: { app: 'glugg-backend' },
        },
        level: 'info',
      },
    ],
  },
};

export const logger: Logger = Pino(loggerOptions);
