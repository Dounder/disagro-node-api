export enum RoleId {
  Admin = 1,
  User = 2
}

export interface User {
  id: number;
  username: string;
  name: string;
  createdBy: UserAudit | null;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
}

export interface UserAudit {
  id: number;
  username: string;
  name: string;
}

export interface PrismaUser {
  id: number;
  name: string;
  username: string;
  createdBy: UserAudit | null;
  userRoles: { role: Role }[]; // Ensure this matches the structure returned by Prisma
}
