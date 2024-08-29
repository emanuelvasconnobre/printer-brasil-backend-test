import { AppException } from "../protocols/app-exception";

export class UnauthorizedException extends AppException {
    static defaultName = "UNAUTHORIZED_EXCEPTION"
    static defaultMessage = "Unauthorized"

    constructor(attr: {
        message?: string,
        traceback?: string,
        issues?: AppException[]
    } = {}) {
        super({
            message: attr.message ?? UnauthorizedException.defaultMessage,
            name: UnauthorizedException.defaultName,
            traceback: attr.traceback,
            issues: attr.issues
        })
    }
}