import { Router } from 'express';

import { validateSchema } from '../../middlewares';
import { CreateServiceSchema, UpdateServiceSchema } from './schemas';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

export class ServicesRoutes {
  static get routes() {
    const router = Router();
    const service = new ServicesService();
    console.log('🚀 ~ ServicesRoutes ~ getroutes ~ service:', service);
    const controller = new ServicesController(service);
    console.log('🚀 ~ ServicesRoutes ~ getroutes ~ controller:', controller);

    router.post('/', validateSchema(CreateServiceSchema), controller.create);
    router.get('/', controller.findAll);
    router.get('/:id', controller.findOne);
    router.put('/:id', validateSchema(UpdateServiceSchema), controller.update);
    router.delete('/:id', controller.remove);
    router.patch('/:id/restore', controller.restore);

    return router;
  }
}
