import { PrismaClient } from '@prisma/client';

import { UsersService } from '../users';
import { AttendanceSelect, AttendanceSelectList } from './helpers';
import { CreateAttendanceDto } from './schemas';
import { DiscountCalculation } from './utils';
import { Attendance, AttendanceList } from './interfaces';

export class AttendancesService {
  private readonly prisma = new PrismaClient();

  constructor(private readonly usersService: UsersService) {}

  create = async (createAttendanceDto: CreateAttendanceDto): Promise<Attendance> => {
    const { user, attendanceDate, attendanceProducts, attendanceServices } = createAttendanceDto;
    // Calculate all the discounts and the total
    const attendanceTotal = DiscountCalculation.calculateTotal(attendanceProducts, attendanceServices);

    return await this.prisma.$transaction(async (tx) => {
      // Create the user
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

  findAll = async (): Promise<AttendanceList[]> => {
    return await this.prisma.attendance.findMany({ select: AttendanceSelectList });
  };

  findOne = async (id: number): Promise<Attendance> => {
    const attendance = await this.prisma.attendance.findUnique({
      where: { id },
      select: AttendanceSelect
    });

    if (!attendance) throw new Error(`Attendance with ID '${id}' not found`);

    return attendance;
  };
}
