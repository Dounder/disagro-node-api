import jwt, { SignOptions } from 'jsonwebtoken';
import { envs } from '../../../config/envs';

export class JwtUtil {
  static async generateToken(payload: any, duration: SignOptions['expiresIn'] = '2h'): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, envs.JWT_SECRET, { expiresIn: duration }, (err, token) => {
        if (err) resolve(null);

        resolve(token || null);
      });
    });
  }

  static async verifyToken(token: string): Promise<any | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SECRET, (err, decoded) => {
        if (err) resolve(null);

        resolve(decoded || null);
      });
    });
  }
}
