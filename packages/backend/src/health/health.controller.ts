import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import type { HealthResponse } from '@glugg/shared';

@Controller('/api/v1/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): HealthResponse {
    return this.healthService.getHealth();
  }

  @Get('redis')
  getRedisHealth() {
    return this.healthService.getRedisHealth();
  }

  @Get('db')
  async getDbHealth() {
    return this.healthService.getDbHealth();
  }
}
