import { Router } from 'express';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { validateSchema } from '../../middlewares';
import { LoginSchema } from './schemas';

export class AuthRoutes {
  static get routes() {
    const router = Router();
    const service = new AuthService();
    const controller = new AuthController(service);

    router.post('/login', validateSchema(LoginSchema), controller.login);

    return router;
  }
}
