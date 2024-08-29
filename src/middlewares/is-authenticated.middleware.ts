import { UnauthorizedHttpException } from "@modules/exceptions/http-exceptions";
import { NextFunction, Request, Response } from "express";

export const isAuthenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.user) {
    next();
  } else {
    throw new UnauthorizedHttpException();
  }
};
