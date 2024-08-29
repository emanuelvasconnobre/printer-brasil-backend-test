import { Request, Response } from "express";
import { BaseController } from "./protocols/base-controller";
import { ApiResponse } from "./protocols/api-response";

export class HealthController extends BaseController {
  constructor() {
    super();
  }

  protected initializeRoutes() {
    this.router.get("/health", this.handleRequest.bind(this));
  }
  
  public async handleRequest(req: Request, res: Response) {
    res.json(new ApiResponse(null, "Ok"));
  }
}
