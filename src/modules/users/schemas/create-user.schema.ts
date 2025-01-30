import z from 'zod';
import { RoleId } from '../interfaces';

export const CreateUserSchema = z.object({
  username: z.string().min(3).max(255),
  name: z.string().min(3).max(255),
  password: z.string().min(6).max(255),
  roles: z.array(z.number()).optional().default([RoleId.User])
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
