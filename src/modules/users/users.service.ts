import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { UserSelect } from './helpers';
import { PrismaUser, RoleId, User } from './interfaces';
import { CreateUserDto, UpdateUserDto } from './schemas';

export class UsersService {
  private readonly prisma = new PrismaClient();

  createUser = async (createUserDto: CreateUserDto): Promise<User & { password: string }> => {
    const { roles, ...rest } = createUserDto;
    const userRoles = roles?.length ? roles.map((roleId) => ({ roleId })) : [{ roleId: RoleId.User }];
    const password = this.generateRandomPassword();

    const user = await this.prisma.user.create({
      data: {
        ...rest,
        password: bcrypt.hashSync(password, 10),
        userRoles: {
          createMany: { data: userRoles }
        }
      },
      select: UserSelect
    });

    return { ...this.plainUsers([user])[0], password };
  };

  findOne = async (id: number): Promise<User> => {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: UserSelect
    });

    if (!user) throw new Error(`User with ID ${id} not found`);

    return this.plainUsers([user])[0];
  };

  findAll = async (): Promise<User[]> => {
    const users = await this.prisma.user.findMany({
      where: { deletedAt: null },
      select: UserSelect
    });

    return this.plainUsers(users);
  };

  updateUser = async (id: number, updateUserDto: UpdateUserDto): Promise<User> => {
    try {
      await this.findOne(id);

      const { roles, ...rest } = updateUserDto;
      const userRoles = roles ? roles.map((roleId) => ({ roleId })) : [{ roleId: RoleId.User }];

      const user = await this.prisma.user.update({
        where: { id },
        data: {
          ...rest,
          userRoles: {
            deleteMany: {},
            createMany: { data: userRoles }
          }
        },
        select: UserSelect
      });

      return this.plainUsers([user])[0];
    } catch (error) {
      throw error;
    }
  };

  updatePassword = async (id: number, password: string): Promise<User> => {
    try {
      await this.findOne(id);

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { password: bcrypt.hashSync(password, 10) },
        select: UserSelect
      });

      return this.plainUsers([updatedUser])[0];
    } catch (error) {
      throw error;
    }
  };

  removeUser = async (id: number): Promise<User> => {
    try {
      await this.findOne(id);

      const user = await this.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
        select: UserSelect
      });

      return this.plainUsers([user])[0];
    } catch (error) {
      throw error;
    }
  };

  restoreUser = async (id: number): Promise<User> => {
    try {
      await this.findOne(id);

      const user = await this.prisma.user.update({
        where: { id },
        data: { deletedAt: null },
        select: UserSelect
      });

      return this.plainUsers([user])[0];
    } catch (error) {
      throw error;
    }
  };

  private plainUsers = (users: PrismaUser[]): User[] => {
    return users.map((user) => {
      const { userRoles, ...rest } = user;
      const roles = userRoles.map(({ role }) => role);
      return { ...rest, roles };
    });
  };

  /**
   * Generates a random password of specified length using alphanumeric characters.
   *
   * @param length - The desired length of the password. Defaults to 6 characters.
   * @returns A randomly generated password string containing letters and numbers.
   *
   * @remarks
   * The password will contain a mix of:
   * - Uppercase letters (A-Z)
   * - Lowercase letters (a-z)
   * - Numbers (0-9)
   *
   * Note: This is a basic implementation and may not be suitable for production security requirements.
   * Consider using a more cryptographically secure method for sensitive applications.
   */
  private generateRandomPassword(length: number = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let generatedPassword = '';

    const charsLength = chars.length;

    for (let i = 0; i < length; i++) generatedPassword += chars.charAt(Math.floor(Math.random() * charsLength));

    return generatedPassword;
  }
}
