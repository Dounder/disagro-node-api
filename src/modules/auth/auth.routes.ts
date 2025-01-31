import { Router } from 'express';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

export class AuthRoutes {
  static get routes() {
    const router = Router();
    const service = new AuthService();
    const controller = new AuthController(service);

    router.post('/login', controller.login);

    return router;
  }
}
