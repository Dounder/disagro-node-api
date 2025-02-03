import { PrismaClient } from '@prisma/client';

import { UsersService } from '../users';
import { AttendanceSelect, AttendanceSelectList } from './helpers';
import { CreateAttendanceDto } from './schemas';
import { DiscountCalculation } from './utils';
import { Attendance, AttendanceList } from './interfaces';
import { EmailService } from '../email';
import { envs } from '../../config/envs';

export class AttendancesService {
  private readonly prisma = new PrismaClient();

  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService
  ) {}

  create = async (createAttendanceDto: CreateAttendanceDto): Promise<Attendance> => {
    const { user, attendanceDate, products: attendanceProducts, services: attendanceServices } = createAttendanceDto;
    // Calculate all the discounts and the total
    const attendanceTotal = DiscountCalculation.calculateTotal(attendanceProducts, attendanceServices);

    const { newUser, attendance } = await this.prisma.$transaction(async (tx) => {
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

      return { attendance, newUser };
    });

    // Send the email with the credentials
    const fullname = `${newUser.firstName} ${newUser.lastName}`;
    await this.sendEmailWithCredentials(fullname, newUser.email, newUser.password, attendanceDate);

    return attendance;
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

  findByUser = async (userId: number): Promise<AttendanceList[]> => {
    return await this.prisma.attendance.findMany({
      where: { userId },
      select: AttendanceSelectList
    });
  };

  private sendEmailWithCredentials = async (
    name: string,
    email: string,
    password: string,
    date: string
  ): Promise<boolean> => {
    const subject = '¡Bienvenido/a a Feria de Promociones - 2023!';
    const formattedDate = new Date(date);
    const dateStr = formattedDate.toISOString().split('T')[0];
    const timeStr = formattedDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

    const html = `
  <p>Estimado/a ${name},</p>
  <p>¡Gracias por confirmar su asistencia a <strong>Feria de Promociones - 2023</strong>! Estamos encantados de contar con su participación en este evento tan especial.</p>
  <p>A continuación, le recordamos los detalles del evento:</p>
  <ul>
    <li><strong>Fecha:</strong> ${dateStr}</li>
    <li><strong>Hora:</strong> ${timeStr}</li>
  </ul>
  <p>Para acceder a la plataforma del evento, utilice las siguientes credenciales de acceso:</p>
  <ul>
    <li><strong>Usuario:</strong> ${email}</li>
    <li><strong>Contraseña:</strong> ${password}</li>
    <li><strong>URL de acceso:</strong> <a href="${envs.APP_URL}">Haga clic aquí para iniciar sesión</a></li>
  </ul>
  <p>Por razones de seguridad, le recomendamos que cambie su contraseña después de su primer inicio de sesión</p>
  <p>¡Esperamos verle en el evento!</p>
  `;
    return this.emailService.sendEmail({ to: email, subject, html });
  };
}
