import { Router } from 'express';
import { validateSchema } from '../../middlewares';
import { CreateProductSchema, UpdateProductSchema } from './schemas';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

export class ProductsRoutes {
  static get routes() {
    const router = Router();
    const service = new ProductsService();
    const controller = new ProductsController(service);

    router.post('/', validateSchema(CreateProductSchema), controller.create);
    router.get('/', controller.findAll);
    router.get('/:id', controller.findOne);
    router.put('/:id', validateSchema(UpdateProductSchema), controller.update);
    router.delete('/:id', controller.remove);
    router.patch('/:id/restore', controller.restore);

    return router;
  }
}
