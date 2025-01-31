import jwt, { SignOptions } from 'jsonwebtoken';

export class JwtUtil {
  static async generateToken(payload: any, duration: SignOptions['expiresIn'] = '2h'): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, 'secret', { expiresIn: duration }, (err, token) => {
        if (err) resolve(null);

        resolve(token || null);
      });
    });
  }
}
