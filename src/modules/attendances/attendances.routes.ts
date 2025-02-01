import { Router } from 'express';

import { validateSchema } from '../../middlewares';
import { UsersService } from '../users';
import { createAttendanceSchema } from './schemas';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { AuthMiddleware } from '../auth/middlewares';
import { EmailService } from '../email';
import { envs } from '../../config/envs';

export class AttendancesRoutes {
  static get routes() {
    const router = Router();
    const emailService = new EmailService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);
    const userService = new UsersService();
    const service = new AttendancesService(userService, emailService);
    const controller = new AttendancesController(service);

    router.post('/', validateSchema(createAttendanceSchema), controller.create);
    router.get('/', [AuthMiddleware.validateJwt], controller.findAll);
    router.get('/:id', [AuthMiddleware.validateJwt], controller.findOne);

    return router;
  }
}
