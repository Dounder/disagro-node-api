import { Router } from 'express';

import { validateSchema } from '../../middlewares';
import { UsersService } from '../users';
import { createAttendanceSchema } from './schemas';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';

export class AttendancesRoutes {
  static get routes() {
    const router = Router();
    const userService = new UsersService();
    const service = new AttendancesService(userService);
    const controller = new AttendancesController(service);

    router.post('/', validateSchema(createAttendanceSchema), controller.create);
    router.get('/', controller.findAll);
    router.get('/:id', controller.findOne);

    return router;
  }
}
