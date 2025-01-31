import { Router } from 'express';
import { UsersRoutes } from '../modules/users';
import { ServicesRoutes } from '../modules/services';
import { ProductsRoute } from '../modules/products';

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use('/users', UsersRoutes.routes);
    router.use('/services', ServicesRoutes.routes);
    router.use('/products', ProductsRoute.routes);

    return router;
  }
}
