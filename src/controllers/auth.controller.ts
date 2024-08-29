import { NextFunction, Request, Response } from "express";
import { BaseController } from "./protocols/base-controller";
import { AuthService } from "@modules/services";
import {
  InternalServerHttpException
} from "@modules/exceptions/http-exceptions";
import { validateDto } from "@modules/utils";
import { ApiResponse } from "./protocols/api-response";
import { LoginDto, RegisterDto } from "@modules/validation/auth";
import { isAuthenticatedMiddleware } from "@modules/middlewares";

export class AuthController extends BaseController {
  private authService = new AuthService();
  private routeName = "auth";

  constructor() {
    super();
    this.router.post(`/${this.routeName}/login`, this.login.bind(this));
    this.router.get(
      `/${this.routeName}`,
      isAuthenticatedMiddleware,
      this.checkAccess.bind(this)
    );
    this.router.post(`/${this.routeName}/register`, this.register.bind(this));
    this.router.get(
      `/${this.routeName}/logout`,
      isAuthenticatedMiddleware,
      this.logout.bind(this)
    );
  }

  protected initializeRoutes(): void {}

  public handleRequest(req: Request, res: Response): void {}

  private async checkAccess(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userInfo = req.session.user ?? {};

    try {
      res.status(200).json(new ApiResponse(userInfo, "Logged in"));
    } catch (error: any) {
      next(error);
    }
  }

  private async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body = req.body;

    try {
      await validateDto(LoginDto, body);
      const user = await this.authService.login(body);
      req.session.save((err: any) => {
        if (err) {
          throw new InternalServerHttpException({
            message: "Could not log in.",
            traceback: err,
          });
        } else {
          if (req.session) {
            req.session.user = {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
            };
          }
          res.status(200).json(
            new ApiResponse(
              {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
              },
              "Logged in"
            )
          );
        }
      });
    } catch (error: any) {
      next(error);
    }
  }

  private logout(req: Request, res: Response, next: NextFunction): void {
    try {
      req.session?.destroy((err) => {
        if (err) {
          throw new InternalServerHttpException({
            message: "Could not log out.",
            traceback: err,
          });
        } else {
          res.clearCookie("connect.sid");
          res.status(200).json(new ApiResponse(undefined, "Logged out"));
        }
      });
    } catch (error: any) {
      next(error);
    }
  }

  private async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body = req.body;

    try {
      await validateDto(RegisterDto, body);
      await this.authService.register(body);

      res
        .status(200)
        .json(new ApiResponse(undefined, "User registered successfully"));
    } catch (error: any) {
      next(error);
    }
  }
}
