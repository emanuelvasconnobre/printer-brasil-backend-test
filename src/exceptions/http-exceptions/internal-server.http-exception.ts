import { UnexpectedException } from '../app-exceptions';
import { HttpException } from '../protocols';

export class InternalServerHttpException extends HttpException {
    constructor(attr: { message?: string; traceback?: string } = {}) {
        super({
            message: attr.message ?? UnexpectedException.defaultMessage,
            detail: new UnexpectedException({
                traceback: attr.traceback,
            }),
        });
    }
}
