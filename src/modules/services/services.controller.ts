import { Request, Response } from 'express';

import { ServicesService } from './services.service';

export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  create = async (req: Request, res: Response) => {
    try {
      const service = await this.servicesService.create(req.body);
      res.status(201).json(service);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  findAll = async (req: Request, res: Response) => {
    const services = await this.servicesService.findAll();
    res.json(services);
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const service = await this.servicesService.findOne(+req.params.id);
      res.json(service);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const service = await this.servicesService.update(+req.params.id, req.body);
      res.json(service);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      const service = await this.servicesService.remove(+req.params.id);
      res.json(service);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  restore = async (req: Request, res: Response) => {
    try {
      const service = await this.servicesService.restore(+req.params.id);
      res.json(service);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };
}
