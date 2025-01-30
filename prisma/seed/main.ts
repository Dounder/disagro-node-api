import { PrismaClient } from '@prisma/client';
import { usersSeed } from './users.seed';
import { rolesSeed } from './roles.seed';

const prisma = new PrismaClient();

const main = async () => {
  await rolesSeed(prisma);
  await usersSeed(prisma);
};

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
