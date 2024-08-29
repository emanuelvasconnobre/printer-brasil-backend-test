import { BadRequestException } from "../app-exceptions/bad-request.exception";
import { AppException, HttpException } from "../protocols";

export class BadRequestHttpException extends HttpException {
  constructor(
    attr: {
      message?: string;
      traceback?: string;
      details?: AppException;
      issues?: AppException[];
    } = {}
  ) {
    super({
      message: attr.message ?? BadRequestException.defaultMessage,
      status: "BAD_REQUEST",
      detail:
        attr.details ??
        new BadRequestException({
          traceback: attr.traceback,
          issues: attr.issues,
        }),
    });
  }
}
