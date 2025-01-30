import z from 'zod';
import { RoleId } from '../interfaces';

export const UpdateUserSchema = z.object({
  username: z.string().min(3).max(255),
  name: z.string().min(3).max(255),
  roles: z.array(z.number()).default([RoleId.User])
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
