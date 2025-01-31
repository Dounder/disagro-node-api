import { Prisma } from '@prisma/client';

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: Prisma.Decimal;
  createdAt: Date;
  deletedAt: Date | null;
}

export interface ProductSummary {
  id: number;
  name: string;
}
