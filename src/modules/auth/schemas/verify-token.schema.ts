import { z } from 'zod';

export const VerifyTokenSchema = z.object({
  token: z.string()
});

export type VerifyTokenDto = z.infer<typeof VerifyTokenSchema>;
