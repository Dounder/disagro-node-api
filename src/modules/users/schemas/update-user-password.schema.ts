import z from 'zod';

export const UpdateUserPasswordSchema = z.object({
  password: z.string().min(6).max(255)
});

export type UpdateUserPasswordDto = z.infer<typeof UpdateUserPasswordSchema>;
