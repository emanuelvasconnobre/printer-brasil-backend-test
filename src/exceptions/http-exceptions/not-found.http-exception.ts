import { NotFoundException } from '../app-exceptions';
import { AppException, HttpException } from '../protocols';

export class NotFoundHttpException extends HttpException {
    constructor(attr: { message?: string; details?: AppException } = {}) {
        super({
            message: attr.message ?? NotFoundException.defaultMessage,
            status: "NOT_FOUND",
            detail: attr.details ?? new NotFoundException(),
        });
    }
}
