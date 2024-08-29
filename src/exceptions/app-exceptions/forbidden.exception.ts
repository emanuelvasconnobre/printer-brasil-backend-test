import { AppException } from "../protocols/app-exception";

export class ForbiddenException extends AppException {
    static defaultName = "FORBIDDEN_EXCEPTION"
    static defaultMessage = "Forbidden"

    constructor(attr: {
        message?: string,
        traceback?: string,
        issues?: AppException[]
    } = {}) {
        super({
            message: attr.message ?? ForbiddenException.defaultMessage,
            name: ForbiddenException.defaultName,
            traceback: attr.traceback,
            issues: attr.issues
        })
    }
}