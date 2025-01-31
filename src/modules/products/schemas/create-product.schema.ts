import z from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(3).max(255),
  price: z.number().positive(),
  description: z.string().max(255).optional()
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;

export const CreateAttendanceProductSchema = z.object({
  id: z.number().positive(),
  price: z.number().positive()
});

export type CreateAttendanceProductDto = z.infer<typeof CreateAttendanceProductSchema>;
