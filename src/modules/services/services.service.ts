import { PrismaClient } from '@prisma/client';

export class ServicesService {
  private readonly prisma = new PrismaClient();
}
