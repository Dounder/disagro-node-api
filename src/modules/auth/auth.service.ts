import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { UserSelect } from '../users';
import { AuthResponse, TokenPayload } from './interfaces';
import { LoginDto } from './schemas';
import { JwtUtil } from './utils';

export class AuthService {
  private readonly prisma = new PrismaClient();

  login = async (loginDto: LoginDto): Promise<AuthResponse> => {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { ...UserSelect, password: true }
    });

    if (!user) {
      console.log('User not found');
      throw new Error('Invalid credentials');
    }

    const { password: userPassword, ...rest } = user;

    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) {
      console.log('Password is invalid');
      throw new Error('Invalid credentials');
    }

    return { user: rest, token: await this.generateToken({ id: user.id }) };
  };

  private generateToken = async (payload: TokenPayload): Promise<string> => {
    const token = await JwtUtil.generateToken(payload);

    if (!token) {
      console.log('Error generating token');
      throw new Error('Error when trying to login');
    }

    return token;
  };
}
