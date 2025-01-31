import { PrismaClient } from '@prisma/client';

import { ServiceSelect } from './helpers';
import { CreateServiceDto, UpdateServiceDto } from './schemas';
import { Service } from './interfaces';

export class ServicesService {
  private readonly prisma = new PrismaClient();

  create = async (createServiceDto: CreateServiceDto): Promise<Service> => {
    return this.prisma.service.create({
      data: createServiceDto,
      select: ServiceSelect
    });
  };

  findAll = async (): Promise<Service[]> => {
    return this.prisma.service.findMany({
      select: ServiceSelect
    });
  };

  findOne = async (id: number): Promise<Service> => {
    const service = await this.prisma.service.findFirst({
      where: { id },
      select: ServiceSelect
    });

    if (!service) throw new Error('Service not found');

    return service;
  };

  update = async (id: number, updateServiceDto: UpdateServiceDto): Promise<Service> => {
    await this.findOne(id); // Ensure service exists

    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
      select: ServiceSelect
    });
  };

  remove = async (id: number): Promise<Service> => {
    const service = await this.findOne(id); // Ensure service exists

    if (service.deletedAt) throw new Error('Service already deleted');

    return this.prisma.service.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: ServiceSelect
    });
  };

  restore = async (id: number): Promise<Service> => {
    const service = await this.findOne(id); // Ensure service exists

    if (!service.deletedAt) throw new Error('Service not deleted');

    return this.prisma.service.update({
      where: { id },
      data: { deletedAt: null },
      select: ServiceSelect
    });
  };
}
