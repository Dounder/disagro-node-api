import { PrismaClient } from '@prisma/client';

import { CreateAttendanceProductDto } from '../products';
import { CreateAttendanceServiceDto } from '../services';
import { UsersService } from '../users';
import { AttendanceSelect, DISCOUNT_RULES } from './helpers';
import { AttendanceTotal, ProductCalculation, ServiceCalculation } from './interfaces';
import { CreateAttendanceDto } from './schemas';

export class AttendancesService {
  private readonly prisma = new PrismaClient();

  constructor(private readonly usersService: UsersService) {}

  create = async (createAttendanceDto: CreateAttendanceDto) => {
    const { user, attendanceDate, attendanceProducts, attendanceServices } = createAttendanceDto;
    const attendanceTotal = this.calculateTotal(attendanceProducts, attendanceServices);

    return await this.prisma.$transaction(async (tx) => {
      const newUser = await this.usersService.createUser(user);

      const attendance = await tx.attendance.create({
        data: {
          ...attendanceTotal,
          attendanceDate,
          user: { connect: { id: newUser.id } },
          attendanceProducts: {
            createMany: {
              data: attendanceProducts.map(({ price, id }) => ({ productId: id, price }))
            }
          },
          attendanceServices: {
            createMany: {
              data: attendanceServices.map(({ price, id }) => ({ serviceId: id, price }))
            }
          }
        },
        select: AttendanceSelect
      });

      return attendance;
    });
  };

  private calculateTotal = (
    products: CreateAttendanceProductDto[],
    services: CreateAttendanceServiceDto[]
  ): AttendanceTotal => {
    const productsCalculation = this.calculateProducts(products);
    const servicesCalculation = this.calculateServices(services);

    return {
      ...productsCalculation,
      ...servicesCalculation,
      final_total: productsCalculation.products_final_total + servicesCalculation.services_final_total
    };
  };

  private calculateDiscount = (quantity: number, total?: number): number => {
    const applicableDiscount = DISCOUNT_RULES.find(({ condition }) => condition(quantity, total));
    return applicableDiscount?.discount || 0;
  };

  private calculateProducts = (products: CreateAttendanceProductDto[]): ProductCalculation => {
    const totalProducts = products.reduce((acc, { price }) => acc + price, 0);
    const discount = this.calculateDiscount(products.length);
    const productsDiscount = totalProducts * discount;

    return {
      products_original_total: totalProducts,
      products_discount_amount: productsDiscount,
      products_discount_rate: discount,
      products_final_total: totalProducts - productsDiscount
    };
  };

  private calculateServices = (services: CreateAttendanceServiceDto[]): ServiceCalculation => {
    const totalServices = services.reduce((acc, { price }) => acc + price, 0);
    const discount = this.calculateDiscount(services.length, totalServices);
    const servicesDiscount = totalServices * discount;

    return {
      services_original_total: totalServices,
      services_discount_amount: servicesDiscount,
      services_discount_rate: discount,
      services_final_total: totalServices - servicesDiscount
    };
  };
}
