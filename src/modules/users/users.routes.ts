import { Router } from 'express';

import { validateSchema } from '../../middlewares';
import { CreateUserSchema, UpdateUserPasswordSchema, UpdateUserSchema } from './schemas';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

export class UsersRoutes {
  static get routes() {
    const router = Router();
    const service = new UsersService();
    const controller = new UsersController(service);

    router.post('/', validateSchema(CreateUserSchema), controller.createUser);
    router.get('/', controller.getAllUsers);
    router.get('/:id', controller.getUser);
    router.put('/:id', validateSchema(UpdateUserSchema), controller.updateUser);
    router.put('/:id/password', validateSchema(UpdateUserPasswordSchema), controller.updatePassword);
    router.delete('/:id', controller.removeUser);
    router.patch('/:id/restore', controller.restoreUser);

    return router;
  }
}
