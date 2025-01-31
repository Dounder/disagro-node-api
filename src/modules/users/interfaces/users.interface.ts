export enum RoleId {
  Admin = 1,
  User = 2
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
}

export interface PrismaUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userRoles: { role: Role }[]; // Ensure this matches the structure returned by Prisma
}
