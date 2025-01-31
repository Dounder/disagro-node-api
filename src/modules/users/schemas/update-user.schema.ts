import z from 'zod';
import { RoleId } from '../interfaces';

export const UpdateUserSchema = z.object({
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  email: z.string().email(),
  roles: z.array(z.number()).default([RoleId.User])
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
