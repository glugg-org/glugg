import z from 'zod';

export const configSchema = z.object({
  FRONTEND_URL: z.url(),
  OTLP_TRACE_EXPORTER_URL: z.url(),
  LOKI_URL: z.url(),
});

export type Config = z.infer<typeof configSchema>;

export const config: Config = configSchema.parse(process.env);
