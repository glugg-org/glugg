import { Injectable } from '@nestjs/common';
import { HealthResponse } from '@glugg/shared';

@Injectable()
export class HealthService {
  getHealth(): HealthResponse {
    return 'Healthy';
  }
}
