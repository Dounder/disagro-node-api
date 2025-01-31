import { Prisma } from '@prisma/client';
import { ProductSummary } from '../../products';
import { ServiceSummary } from '../../services';
import { UserSummary } from '../../users';

export interface Attendance {
  id: number;
  attendanceDate: Date;
  services_original_total: Prisma.Decimal;
  services_discount_amount: Prisma.Decimal;
  services_discount_rate: Prisma.Decimal;
  services_final_total: Prisma.Decimal;
  products_original_total: Prisma.Decimal;
  products_discount_amount: Prisma.Decimal;
  products_discount_rate: Prisma.Decimal;
  products_final_total: Prisma.Decimal;
  final_total: Prisma.Decimal;
  createdAt: Date;
  deletedAt: Date | null;
  user: UserSummary;
  attendanceProducts: AttendanceProduct[];
  attendanceServices: AttendanceService[];
}

export interface AttendanceProduct {
  id: number;
  price: Prisma.Decimal;
  product: ProductSummary;
}

export interface AttendanceService {
  id: number;
  price: Prisma.Decimal;
  service: ServiceSummary;
}

export interface AttendanceList {
  id: number;
  attendanceDate: Date;
  services_discount_rate: Prisma.Decimal;
  products_discount_rate: Prisma.Decimal;
  final_total: Prisma.Decimal;
  createdAt: Date;
  deletedAt: Date | null;
  user: UserSummary;
}
