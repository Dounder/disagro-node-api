import { PrismaClient } from '@prisma/client';

const roles = [
  {
    id: 1,
    name: 'Admin',
    description: 'Responsible for managing system-wide settings and overseeing all operations.'
  },
  {
    id: 2,
    name: 'User',
    description: 'A regular user with limited permissions.'
  }
];

export const rolesSeed = async (prisma: PrismaClient) => {
  const upserts = roles.map(({ id, name, description }) =>
    prisma.role.upsert({
      where: { id },
      update: { name, description },
      create: { id, name, description }
    })
  );

  try {
    await prisma.$transaction(upserts);
    console.log('Roles seeded successfully');
  } catch (error) {
    console.error('Error seeding the roles:', error);
  }
};
