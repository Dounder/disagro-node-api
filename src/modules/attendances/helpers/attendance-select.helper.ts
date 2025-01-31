import { Prisma } from '@prisma/client';

export const AttendanceSelect = Prisma.validator<Prisma.AttendanceSelect>()({
  id: true,
  attendanceDate: true,

  services_original_total: true,
  services_discount_amount: true,
  services_discount_rate: true,
  services_final_total: true,

  products_original_total: true,
  products_discount_amount: true,
  products_discount_rate: true,
  products_final_total: true,

  final_total: true,

  createdAt: true,
  deletedAt: true,

  user: { select: { id: true, firstName: true, lastName: true, email: true } },

  attendanceProducts: {
    select: {
      id: true,
      price: true,
      product: { select: { id: true, name: true } }
    }
  },

  attendanceServices: {
    select: {
      id: true,
      price: true,
      service: { select: { id: true, name: true } }
    }
  }
});
