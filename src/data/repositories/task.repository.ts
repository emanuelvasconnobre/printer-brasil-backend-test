import { PrismaClient } from "@prisma/client";
import { TaskModel } from "@modules/domain/models";
import { UnexpectedException } from "@modules/exceptions/app-exceptions";

const prisma = new PrismaClient();

export class TaskRepository {
  async count() {
    try {
      const tasksCount = await prisma.task.count();
      return tasksCount;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error counting tasks`,
        traceback: error.message,
      });
    }
  }

  async getMany(take: number, skip: number) {
    try {
      const tasks = await prisma.task.findMany({
        take,
        skip,
      });
      return tasks;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error fetching many tasks`,
        traceback: error.message,
      });
    }
  }

  async getById(id: number) {
    try {
      const task = await prisma.task.findUnique({
        where: { id },
      });
      return task;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error fetching task by ID`,
        traceback: error.message,
      });
    }
  }

  async createOne(taskData: Omit<TaskModel, "id">) {
    try {
      const newTask = await prisma.task.create({
        data: taskData,
      });
      return newTask;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error creating task`,
        traceback: error.message,
      });
    }
  }

  async updateOne(id: number, taskData: Partial<TaskModel>) {
    try {
      const updatedTask = await prisma.task.update({
        where: { id },
        data: taskData,
      });
      return updatedTask;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error updating task`,
        traceback: error.message,
      });
    }
  }

  async deleteOne(id: number) {
    try {
      const deletedTask = await prisma.task.delete({
        where: { id },
      });

      return !!deletedTask;
    } catch (error: any) {
      throw new UnexpectedException({
        message: `Error deleting task`,
        traceback: error.message,
      });
    }
  }
}
