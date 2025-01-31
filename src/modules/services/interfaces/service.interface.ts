import { Prisma } from '@prisma/client';

export interface Service {
  id: number;
  name: string;
  description: string | null;
  price: Prisma.Decimal;
  createdAt: Date;
  deletedAt: Date | null;
}
