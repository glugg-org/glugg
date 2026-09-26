import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { VALKEY_CLIENT, VALKEY_SUB_CLIENT } from './valkey.constants';
import { config } from '../config';

export type RedisClient = Redis;

export const redisProvider: Provider = {
  useFactory: (): RedisClient => {
    return new Redis({
      host: config.VALKEY_HOST,
      port: config.VALKEY_PORT,
      password: config.VALKEY_PASSWORD,
    });
  },
  provide: VALKEY_CLIENT,
};

export const redisSubProvider: Provider = {
  provide: VALKEY_SUB_CLIENT,
  inject: [VALKEY_CLIENT],
  useFactory: (client: RedisClient): RedisClient => {
    return client.duplicate();
  },
};
