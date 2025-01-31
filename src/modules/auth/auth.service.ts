import { PrismaClient } from '@prisma/client';

export class AuthService {
  private readonly prisma = new PrismaClient();

  login = async () => {
    return 'Login successful';
  };
}
