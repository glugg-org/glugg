import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { OpenTelemetryModule } from 'nestjs-otel';
import { LoggerModule } from 'src/logger/logger.module';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
  },
});

@Module({
  imports: [OpenTelemetryModuleConfig, LoggerModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
