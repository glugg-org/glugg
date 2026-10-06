import { Injectable } from '@nestjs/common';
import { HealthResponse } from '@glugg/shared';
import { InjectRedis } from 'src/redis/valkey.decorators';
import Redis from 'ioredis';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly db: DataSource,
  ) {}

  getHealth(): HealthResponse {
    return 'Healthy';
  }

  async getRedisHealth() {
    const pong = await this.redis.ping();
    return pong;
  }

  async getDbHealth() {
    await this.db.query('SELECT 1');
    return this.db.isInitialized ? 'Initialized' : 'Not initialized';
  }
}
