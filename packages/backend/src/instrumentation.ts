import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import {
  CompositePropagator,
  W3CTraceContextPropagator,
  W3CBaggagePropagator,
} from '@opentelemetry/core';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { WideEventSpanProcessor } from 'nestjs-otel';
import { HostMetricsInstrumentation } from '@opentelemetry/instrumentation-host-metrics';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { config } from './config';

const metricReader = new PrometheusExporter({
  port: 8081,
});

const traceExporter = new OTLPTraceExporter({
  url: config.OTLP_TRACE_EXPORTER_URL,
});

const otelSDK = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME ?? 'glugg-backend',
  }),
  metricReader,
  spanProcessors: [
    new WideEventSpanProcessor(),
    new BatchSpanProcessor(traceExporter),
  ],
  contextManager: new AsyncLocalStorageContextManager(),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-http': {
        ignoreIncomingRequestHook: (req) => req.url === '/metrics',
      },
      '@opentelemetry/instrumentation-pino': {
        logHook: (_span, logRecord) => {
          logRecord[ATTR_SERVICE_NAME] = 'glugg-backend';
        },
      },
    }),
    new HostMetricsInstrumentation(),
  ],
  textMapPropagator: new CompositePropagator({
    propagators: [new W3CTraceContextPropagator(), new W3CBaggagePropagator()],
  }),
});

export default otelSDK;
// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => {
        console.log('SDK shut down successfully');
      },
      (err: unknown) => {
        console.log('Error shutting down SDK', err);
      },
    )
    .finally(() => process.exit(0));
});
