import { Request, Response } from 'express';

import { AttendancesService } from './attendances.service';

export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  create = async (req: Request, res: Response) => {
    const attendance = await this.attendancesService.create(req.body);
    res.status(201).json(attendance);
  };
}
