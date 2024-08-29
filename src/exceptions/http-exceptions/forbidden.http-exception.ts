import { ForbiddenException } from "../app-exceptions";
import { AppException, HttpException } from "../protocols";

export class ForbiddenHttpException extends HttpException {
  constructor(attr: { message?: string; details?: AppException } = {}) {
    super({
      message: attr.message ?? ForbiddenException.defaultMessage,
      status: "FORBIDDEN",
      detail: attr.details ?? new ForbiddenException(),
    });
  }
}
