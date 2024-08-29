import { NextFunction, Request, Response } from "express";
import { BaseController } from "./protocols/base-controller";
import { TaskService } from "@modules/services";
import {
  CreateTaskDto,
  UpdateTaskDto,
} from "@modules/validation/task";
import { NotFoundHttpException } from "@modules/exceptions/http-exceptions";
import { validateDto } from "@modules/utils";
import { ApiResponse } from "./protocols/api-response";
import { isAuthenticatedMiddleware } from "@modules/middlewares";

export class TaskController extends BaseController {
  private taskService = new TaskService();
  private routeName = "task";

  constructor() {
    super();
    this.router.get(
      `/${this.routeName}/`,
      isAuthenticatedMiddleware,
      this.getAllTasks.bind(this)
    );
    this.router.get(
      `/${this.routeName}/:id`,
      isAuthenticatedMiddleware,
      this.getTaskById.bind(this)
    );
    this.router.post(
      `/${this.routeName}/`,
      isAuthenticatedMiddleware,
      this.createTask.bind(this)
    );
    this.router.put(
      `/${this.routeName}/:id`,
      isAuthenticatedMiddleware,
      this.updateTask.bind(this)
    );
    this.router.delete(
      `/${this.routeName}/:id`,
      isAuthenticatedMiddleware,
      this.deleteTask.bind(this)
    );
  }

  protected initializeRoutes(): void {}

  public handleRequest(req: Request, res: Response): void {}

  private async getAllTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const countPerPage = parseInt(req.query.countPerPage as string, 10) || 10;

    try {
      const tasks = await this.taskService.getMany(page, countPerPage);
      const countElements = await this.taskService.count();
      const countPage = Math.ceil(countElements / countPerPage);

      res.status(200).json(new ApiResponse({ items: tasks, countPage }));
    } catch (error: any) {
      next(error);
    }
  }

  private async getTaskById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId = parseInt(req.params.id, 10);
      const task = await this.taskService.getById(taskId);

      if (task) {
        res.status(200).json(new ApiResponse(task));
      } else {
        next(
          new NotFoundHttpException({
            message: `Task with id ${taskId} not found`,
          })
        );
      }
    } catch (error: any) {
      next(error);
    }
  }

  private async createTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const taskData = req.body;

    try {
      await validateDto(CreateTaskDto, taskData);

      const createdTask = await this.taskService.create(taskData);
      res.status(201).json(new ApiResponse(createdTask));
    } catch (error: any) {
      next(error);
    }
  }

  private async updateTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId = parseInt(req.params.id, 10);
      const taskData = req.body;

      await validateDto(UpdateTaskDto, taskData);

      const updatedTask = await this.taskService.update(
        taskId,
        taskData
      );

      if (updatedTask) {
        res.status(200).json(new ApiResponse(updatedTask));
      } else {
        throw new NotFoundHttpException({
          message: `Task with id ${taskId} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  private async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId = parseInt(req.params.id, 10);
      const deleted = await this.taskService.delete(taskId);

      if (deleted) {
        res.status(204).send();
      } else {
        throw new NotFoundHttpException({
          message: `Task with id ${taskId} not found`,
        });
      }
    } catch (error: any) {
      next(error);
    }
  }
}
