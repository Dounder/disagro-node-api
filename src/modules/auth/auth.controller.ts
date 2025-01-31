import { Request, Response } from 'express';

import { AuthService } from './auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const authResponse = await this.authService.login();

    res.status(200).json({ authResponse });
  };
}
