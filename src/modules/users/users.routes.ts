import { Router } from 'express';

import { validateSchema } from '../../middlewares';
import { CreateUserSchema, UpdateUserPasswordSchema, UpdateUserSchema } from './schemas';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthMiddleware } from '../auth/middlewares';

export class UsersRoutes {
  static get routes() {
    const router = Router();
    const service = new UsersService();
    const controller = new UsersController(service);

    router.post('/', [AuthMiddleware.validateJwt, validateSchema(CreateUserSchema)], controller.createUser);
    router.get('/', [AuthMiddleware.validateJwt], controller.getAllUsers);
    router.get('/:id', [AuthMiddleware.validateJwt], controller.getUser);
    router.put('/:id', [AuthMiddleware.validateJwt, validateSchema(UpdateUserSchema)], controller.updateUser);
    router.put(
      '/:id/password',
      [AuthMiddleware.validateJwt, validateSchema(UpdateUserPasswordSchema)],
      controller.updatePassword
    );
    router.delete('/:id', [AuthMiddleware.validateJwt], controller.removeUser);
    router.patch('/:id/restore', [AuthMiddleware.validateJwt], controller.restoreUser);

    return router;
  }
}
