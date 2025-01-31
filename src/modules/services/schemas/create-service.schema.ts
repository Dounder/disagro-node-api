import z from 'zod';

export const CreateServiceSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(100).optional(),
  price: z.number().positive()
});

export type CreateServiceDto = z.infer<typeof CreateServiceSchema>;

export const CreateAttendanceServiceSchema = z.object({
  id: z.number().positive(),
  price: z.number().positive()
});

export type CreateAttendanceServiceDto = z.infer<typeof CreateAttendanceServiceSchema>;
