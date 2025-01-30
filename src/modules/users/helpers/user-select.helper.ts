import { Prisma } from '@prisma/client';

export const UserSelect: Prisma.UserSelect = {
  id: true,
  name: true,
  username: true,
  createdAt: true,
  createdBy: { select: { id: true, name: true, username: true } },
  userRoles: { select: { role: { select: { id: true, name: true } } } }
};
