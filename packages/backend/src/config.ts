import z from 'zod';

const zodOptionalNumber = z
  .string()
  .optional()
  .transform((value) =>
    value === '' || value === undefined ? undefined : value,
  )
  .nullable()
  .refine((value) => value === undefined || !isNaN(Number(value)), {
    message: 'Invalid number',
  })
  .transform((value) => (value === undefined ? undefined : Number(value)));

export const configSchema = z.object({
  PORT: zodOptionalNumber,
  FRONTEND_URL: z.url(),
  OTLP_TRACE_EXPORTER_URL: z.url(),
  LOKI_URL: z.url(),
  VALKEY_HOST: z.string(),
  VALKEY_PORT: z.coerce.number(),
  VALKEY_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
});

export type Config = z.infer<typeof configSchema>;

export const config: Config = configSchema.parse(process.env);
