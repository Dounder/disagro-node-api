import { Request, Response } from 'express';

import { AuthService } from './auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    try {
      const response = await this.authService.login(req.body);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  verify = async (req: Request, res: Response) => {
    try {
      const response = await this.authService.verify(req.user);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
