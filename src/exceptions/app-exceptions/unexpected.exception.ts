import { AppException } from "../protocols/app-exception";

export class UnexpectedException extends AppException {
    static defaultName = "UNEXPECTED_EXCEPTION"
    static defaultMessage = "An unexpected error occurred!"

    constructor(attr: {
        message?: string,
        traceback?: string,
        issues?: AppException[]
    } = {}) {
        super({
            message: attr.message ?? UnexpectedException.defaultMessage,
            name: UnexpectedException.defaultName,
            traceback: attr.traceback,
            issues: attr.issues
        })
    }
}