import { Router } from 'express';
import { UsersRoutes } from '../modules/users';
import { ServicesRoutes } from '../modules/services';

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use('/users', UsersRoutes.routes);
    router.use('/services', ServicesRoutes.routes);

    return router;
  }
}
