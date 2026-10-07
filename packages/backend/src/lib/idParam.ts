import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const idParamSchema = z.object({
  id: z.uuid(),
});

export class IdParam extends createZodDto(idParamSchema) {}
