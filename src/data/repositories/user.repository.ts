import { PrismaClient } from "@prisma/client";
import { UserModel } from "@modules/domain/models";
import { UnexpectedException } from "@modules/exceptions/app-exceptions";

const prisma = new PrismaClient();

export class UserRepository {
  async getMany(take: number, skip: number) {
    try {
      const users = await prisma.user.findMany({
        take,
        skip,
      });

      return users;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error fetching users`,
        traceback: error.message,
      });
    }
  }

  async getById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error fetching user by id`,
        traceback: error.message,
      });
    }
  }

  async getByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error fetching user by email`,
        traceback: error.message,
      });
    }
  }

  async createOne(userData: UserModel) {
    try {
      const newUser = await prisma.user.create({
        data: userData,
      });
      return newUser;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error creating user`,
        traceback: error.message,
      });
    }
  }

  async updateOne(id: string, userData: Partial<UserModel>) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: userData,
      });
      return updatedUser;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error updating user`,
        traceback: error.message,
      });
    }
  }

  async deleteOne(id: string) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id },
      });
      return !!deletedUser;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error deleting user`,
        traceback: error.message,
      });
    }
  }
}
