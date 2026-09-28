import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import type { HealthResponse } from '@glugg/shared';
import { InjectRedis } from '../redis/valkey.decorators';
import Redis from 'ioredis';

@Controller('/api/v1/health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Get()
  getHealth(): HealthResponse {
    return this.healthService.getHealth();
  }

  @Get('redis')
  async check() {
    const pong = await this.redis.ping();
    return { redis: pong };
  }
}
