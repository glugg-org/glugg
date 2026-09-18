import z from 'zod';

export const lettersSchema = z.object({
  center: z.string().length(1),
  ring: z.tuple([
    z.string().length(1),
    z.string().length(1),
    z.string().length(1),
    z.string().length(1),
    z.string().length(1),
    z.string().length(1),
  ]),
});

export type Letters = z.infer<typeof lettersSchema>;
