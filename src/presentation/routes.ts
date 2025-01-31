import { Router } from 'express';
import { UsersRoutes } from '../modules/users';
import { ServicesRoutes } from '../modules/services';
import { ProductsRoutes } from '../modules/products';
import { AttendancesRoutes } from '../modules/attendances';
import { AuthRoutes } from '../modules/auth';

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use('/auth', AuthRoutes.routes);
    router.use('/users', UsersRoutes.routes);
    router.use('/services', ServicesRoutes.routes);
    router.use('/products', ProductsRoutes.routes);
    router.use('/attendances', AttendancesRoutes.routes);

    return router;
  }
}
