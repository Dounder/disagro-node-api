import { Router } from 'express';
import { UsersRoutes } from '../modules/users';

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use('/users', UsersRoutes.routes);

    return router;
  }
}
