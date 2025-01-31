import { Router } from 'express';

import { validateSchema } from '../../middlewares';
import { CreateServiceSchema, UpdateServiceSchema } from './schemas';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { AuthMiddleware } from '../auth/middlewares';

export class ServicesRoutes {
  static get routes() {
    const router = Router();
    const service = new ServicesService();
    const controller = new ServicesController(service);

    router.post('/', [AuthMiddleware.validateJwt, validateSchema(CreateServiceSchema)], controller.create);
    router.get('/', [AuthMiddleware.validateJwt], controller.findAll);
    router.get('/:id', [AuthMiddleware.validateJwt], controller.findOne);
    router.put('/:id', [AuthMiddleware.validateJwt, validateSchema(UpdateServiceSchema)], controller.update);
    router.delete('/:id', [AuthMiddleware.validateJwt], controller.remove);
    router.patch('/:id/restore', [AuthMiddleware.validateJwt], controller.restore);

    return router;
  }
}
