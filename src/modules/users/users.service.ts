import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { UserSelect } from './helpers';
import { PrismaUser, RoleId, User } from './interfaces';
import { CreateUserDto, UpdateUserDto } from './schemas';

export class UsersService {
  private readonly prisma = new PrismaClient();

  createUser = async (createUserDto: CreateUserDto /* user: User */) => {
    const { roles, password, ...rest } = createUserDto;

    const user = await this.prisma.user.create({
      data: {
        ...rest,
        password: bcrypt.hashSync(password, 10),
        createdById: 1,
        userRoles: {
          createMany: {
            data: roles.map((roleId) => ({ roleId }))
          }
        }
      },
      select: UserSelect
    });

    return this.plainUsers([user as unknown as PrismaUser]);
  };

  findOne = async (id: number) => {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: UserSelect
    });

    if (!user) return null;

    return this.plainUsers([user as unknown as PrismaUser]);
  };

  findAll = async () => {
    const users = await this.prisma.user.findMany({
      where: { deletedAt: null },
      select: UserSelect
    });

    return this.plainUsers(users as unknown as PrismaUser[]);
  };

  updateUser = async (id: number, updateUserDto: UpdateUserDto) => {
    const { roles, ...rest } = updateUserDto;
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...rest,
        userRoles: {
          deleteMany: {},
          createMany: {
            data: roles.map((roleId) => ({ roleId }))
          }
        }
      },
      select: UserSelect
    });

    return this.plainUsers([user as unknown as PrismaUser]);
  };

  removeUser = async (id: number) => {
    const user = await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: UserSelect
    });

    return this.plainUsers([user as unknown as PrismaUser]);
  };

  restoreUser = async (id: number) => {
    const user = await this.prisma.user.update({
      where: { id },
      data: { deletedAt: null },
      select: UserSelect
    });

    return this.plainUsers([user as unknown as PrismaUser]);
  };

  private plainUsers = (users: PrismaUser[]): User[] => {
    return users.map((user) => {
      const { userRoles, ...rest } = user;
      const roles = userRoles.map(({ role }) => role);
      return { ...rest, roles };
    });
  };
}
