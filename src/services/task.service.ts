import { TaskRepository } from "@modules/data/repositories";
import { TaskModel } from "@modules/domain/models";

export class TaskService {
  repository = new TaskRepository();

  count() {
    return this.repository.count();
  }

  getMany(page: number, countPerPage: number) {
    const take = +countPerPage;
    const skip = page == 1 ? 0 : (page - 1) * countPerPage;

    return this.repository.getMany(take, skip);
  }

  async getById(id: number): Promise<TaskModel | null> {
    const task = await this.repository.getById(id);
    return task;
  }

  async create(taskData: Omit<TaskModel, "id">): Promise<TaskModel> {
    const createdTask = await this.repository.createOne(taskData);
    return createdTask;
  }

  async update(
    id: number,
    taskData: Partial<TaskModel>
  ): Promise<TaskModel | null> {
    const updatedTask = await this.repository.updateOne(id, taskData);
    return updatedTask;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.repository.deleteOne(id);
    return deleted;
  }
}
