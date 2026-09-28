// src/redis/redis.decorators.ts
import { Inject } from '@nestjs/common';
import { VALKEY_CLIENT, VALKEY_SUB_CLIENT } from './valkey.constants';

export const InjectRedis = () => Inject(VALKEY_CLIENT);
export const InjectRedisSub = () => Inject(VALKEY_SUB_CLIENT);
