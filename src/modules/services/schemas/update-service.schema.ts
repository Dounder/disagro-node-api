import z from 'zod';

export const UpdateServiceSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  description: z.string().min(2).max(100).optional(),
  price: z.number().positive().optional()
});

export type UpdateServiceDto = z.infer<typeof UpdateServiceSchema>;
