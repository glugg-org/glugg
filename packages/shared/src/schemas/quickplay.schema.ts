import z from 'zod';
import { gameLanguageSchema } from './gameLanguage.schema';

export const quickplayRequestSchema = z.object({
  gameLanguage: gameLanguageSchema,
});

export type QuickplayRequest = z.infer<typeof quickplayRequestSchema>;
