import z from 'zod';

export const UpdateProductSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  price: z.number().positive().optional(),
  description: z.string().max(255).optional()
});

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
