// src/middlewares/errorHandler.ts

import { logger } from "@modules/config/winston";
import { AppException, HttpException } from "@modules/exceptions/protocols";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export function exceptionMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json(error.serialize());
  } else if (error instanceof AppException) {
    logger.error(`${error.message}: ${error.traceback}`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error.serialize());
  } else {
    logger.error(`Unexpected Error: ${error}`);
    return res.status(500).json({
      error: {
        message: "Internal Error Handled",
      },
    });
  }
}
