import z from 'zod';
import { CreateAttendanceProductSchema } from '../../products';
import { CreateAttendanceServiceSchema } from '../../services';
import { CreateUserSchema } from '../../users';

export const createAttendanceSchema = z.object({
  user: CreateUserSchema,
  attendanceDate: z.string().datetime(),
  services: z.array(CreateAttendanceServiceSchema),
  products: z.array(CreateAttendanceProductSchema)
});

export type CreateAttendanceDto = z.infer<typeof createAttendanceSchema>;
