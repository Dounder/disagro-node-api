import { AttendancesService } from './attendances.service';

export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}
}
