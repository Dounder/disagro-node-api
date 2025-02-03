import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export const usersSeed = async (prisma: PrismaClient) => {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {
      password: bcrypt.hashSync('Abcd@123', 10)
    },
    create: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'jdoe@google.com',
      password: bcrypt.hashSync('Abcd@123', 10),
      userRoles: { create: { roleId: 1 } }
    }
  });
};
