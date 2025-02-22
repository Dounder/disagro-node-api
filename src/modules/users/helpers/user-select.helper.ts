import { Prisma } from '@prisma/client';

export const UserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  createdAt: true,
  userRoles: { select: { role: { select: { id: true, name: true } } } }
});
