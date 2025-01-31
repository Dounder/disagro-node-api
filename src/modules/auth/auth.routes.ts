import { Router } from 'express';
import { validateSchema } from '../../middlewares';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthMiddleware } from './middlewares';
import { LoginSchema } from './schemas';

export class AuthRoutes {
  static get routes() {
    const router = Router();
    const service = new AuthService();
    const controller = new AuthController(service);

    router.post('/login', [validateSchema(LoginSchema)], controller.login);
    router.get('/verify', [AuthMiddleware.validateJwt], controller.verify);

    return router;
  }
}
