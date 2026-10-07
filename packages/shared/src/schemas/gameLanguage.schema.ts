import z from 'zod';

export const gameLanguageSchema = z.enum(['en', 'es']);
export type GameLanguage = z.infer<typeof gameLanguageSchema>;
