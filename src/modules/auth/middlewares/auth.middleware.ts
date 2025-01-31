import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import { UserSelect } from '../../users';
import { JwtUtil } from '../utils';

export class AuthMiddleware {
  private static readonly prisma = new PrismaClient();

  /**
   * Middleware to validate JWT tokens in incoming requests.
   * Verifies the token from headers, validates its payload, and attaches the user to the request body.
   *
   * @param req - Express Request object
   * @param res - Express Response object
   * @param next - Express NextFunction to pass control to the next middleware
   * @throws {Error} With status code 401 if authentication fails for any reason
   */
  static validateJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = this.validateHeaders(req);

      const id = await this.validatePayload(token);

      const user = await this.prisma.user.findUnique({ where: { id }, select: UserSelect });

      if (!user) throw new Error('User not found');

      req.body.user = user;

      next();
    } catch (error) {
      const authError = new Error('Authentication failed');
      (authError as any).statusCode = 401;
      next(authError);
    }
  };

  /**
   * Validates the authorization headers from an incoming HTTP request.
   * Checks for the presence and format of the Bearer token.
   *
   * @param req - Express Request object containing the headers
   * @returns The extracted Bearer token string
   * @throws Error if no token is provided or if token format is invalid
   */
  private static validateHeaders = (req: Request): string => {
    const authorization = req.headers.authorization;

    if (!authorization) throw new Error('No token provided');

    if (!authorization.startsWith('Bearer ')) throw new Error('Invalid token format');

    const token = authorization.split(' ').at(1) || '';

    return token;
  };

  /**
   * Validates the JWT token payload and extracts the user ID
   * @param token - The JWT token string to validate
   * @returns Promise containing the user ID from the token payload
   * @throws Error if token is invalid or verification fails
   */
  private static validatePayload = async (token: string): Promise<number> => {
    const payload = await JwtUtil.verifyToken(token);

    if (!payload) throw new Error('Invalid token');

    return payload.id;
  };
}
