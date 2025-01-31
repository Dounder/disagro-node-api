import z from 'zod';
import { CreateAttendanceProductSchema } from '../../products';
import { CreateAttendanceServiceSchema } from '../../services';
import { CreateUserSchema } from '../../users';

export const createAttendanceSchema = z.object({
  user: CreateUserSchema,
  attendanceDate: z.string().date(),
  attendanceServices: z.array(CreateAttendanceServiceSchema),
  attendanceProducts: z.array(CreateAttendanceProductSchema)
});
