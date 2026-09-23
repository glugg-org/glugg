import z from 'zod';

export const configSchema = z.object({
  FRONTEND_URL: z.url(),
});

export type Config = z.infer<typeof configSchema>;

export const config = configSchema.parse(process.env);
