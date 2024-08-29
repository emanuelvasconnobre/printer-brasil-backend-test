import { UnauthorizedException } from "../app-exceptions";
import { AppException, HttpException } from "../protocols";

export class UnauthorizedHttpException extends HttpException {
  constructor(attr: { message?: string; details?: AppException } = {}) {
    super({
      message: attr.message ?? UnauthorizedException.defaultMessage,
      status: "UNAUTHORIZED",
      detail: attr.details ?? new UnauthorizedException(),
    });
  }
}
