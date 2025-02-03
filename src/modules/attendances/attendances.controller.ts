import { Request, Response } from 'express';

import { AttendancesService } from './attendances.service';

export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  create = async (req: Request, res: Response) => {
    const attendance = await this.attendancesService.create(req.body);
    res.status(201).json(attendance);
  };

  findAll = async (req: Request, res: Response) => {
    const attendances = await this.attendancesService.findAll();
    res.json(attendances);
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedId = Number(id);

    if (!id) res.status(400).json({ error: `Attendance ID is required` });
    if (isNaN(parsedId)) res.status(400).json({ error: `Attendance ID '${id}' must be a number` });

    try {
      const attendance = await this.attendancesService.findOne(parsedId);

      res.json(attendance);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  findByUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedId = Number(id);

    if (!id) res.status(400).json({ error: `User ID is required` });
    if (isNaN(parsedId)) res.status(400).json({ error: `User ID '${id}' must be a number` });

    try {
      const attendances = await this.attendancesService.findByUser(parsedId);

      res.json(attendances);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };
}
