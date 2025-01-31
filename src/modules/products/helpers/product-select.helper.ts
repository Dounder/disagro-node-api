import { Prisma } from '@prisma/client';

export const ProductSelect = Prisma.validator<Prisma.ProductSelect>()({
  id: true,
  name: true,
  description: true,
  price: true,
  createdAt: true,
  deletedAt: true
});
