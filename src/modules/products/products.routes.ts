import { Router } from 'express';
import { validateSchema } from '../../middlewares';
import { AuthMiddleware } from '../auth/middlewares';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductSchema, UpdateProductSchema } from './schemas';

export class ProductsRoutes {
  static get routes() {
    const router = Router();
    const service = new ProductsService();
    const controller = new ProductsController(service);

    router.post('/', [AuthMiddleware.validateJwt, validateSchema(CreateProductSchema)], controller.create);
    router.get('/', [AuthMiddleware.validateJwt], controller.findAll);
    router.get('/:id', [AuthMiddleware.validateJwt], controller.findOne);
    router.put('/:id', [AuthMiddleware.validateJwt, validateSchema(UpdateProductSchema)], controller.update);
    router.delete('/:id', [AuthMiddleware.validateJwt], controller.remove);
    router.patch('/:id/restore', [AuthMiddleware.validateJwt], controller.restore);

    return router;
  }
}
