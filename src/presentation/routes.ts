import { Router } from 'express';
import { UsersRoutes } from '../modules/users';
import { ServicesRoutes } from '../modules/services';
import { ProductsRoutes } from '../modules/products';
import { AttendancesRoutes } from '../modules/attendances';

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use('/users', UsersRoutes.routes);
    router.use('/services', ServicesRoutes.routes);
    router.use('/products', ProductsRoutes.routes);
    router.use('/attendances', AttendancesRoutes.routes);

    return router;
  }
}
