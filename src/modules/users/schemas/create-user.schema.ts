import z from 'zod';
import { RoleId } from '../interfaces';

export const CreateUserSchema = z.object({
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  email: z.string().email().min(3).max(255),
  roles: z.array(z.number()).optional().default([RoleId.User])
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
