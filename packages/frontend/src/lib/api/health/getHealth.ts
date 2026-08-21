import { healthResponseSchema } from '@glugg/shared';
import { ofetch } from 'ofetch';

export async function getHealth(): Promise<boolean> {
  try {
    const response: unknown = await ofetch(
      (process.env.NEXT_PUBLIC_BACKEND_URL ?? '') + '/api/v1/health',
    );
    const _parsed = healthResponseSchema.parse(response);
    return true;
  } catch {
    return false;
  }
}
