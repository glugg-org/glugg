import Pino, { Logger, LoggerOptions } from 'pino';
import { config } from '../config';

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
          host: config.LOKI_URL,
          labels: { app: 'glugg-backend' },
        },
        level: 'info',
      },
    ],
  },
};

export const logger: Logger = Pino(loggerOptions);
