import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { OpenTelemetryModule } from 'nestjs-otel';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
  },
});

@Module({
  imports: [OpenTelemetryModuleConfig],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
