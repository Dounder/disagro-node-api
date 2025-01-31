import { Prisma } from '@prisma/client';

export const ServiceSelect = Prisma.validator<Prisma.ServiceSelect>()({
  id: true,
  name: true,
  description: true,
  price: true,
  createdAt: true,
  deletedAt: true
});
