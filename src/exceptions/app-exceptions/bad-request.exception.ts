import { AppException } from "../protocols/app-exception";

export class BadRequestException extends AppException {
    static defaultName = "BAD_REQUEST_EXCEPTION"
    static defaultMessage = "Bad request"

    constructor(attr: {
        message?: string,
        traceback?: string,
        issues?: AppException[]
    } = {}) {
        super({
            message: attr.message ?? BadRequestException.defaultMessage,
            name: BadRequestException.defaultName,
            traceback: attr.traceback,
            issues: attr.issues
        })
    }
}