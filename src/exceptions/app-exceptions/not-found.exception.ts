import { AppException } from "../protocols/app-exception";

export class NotFoundException extends AppException {
    static defaultName = "NOT_FOUND_EXCEPTION"
    static defaultMessage = "Not Found"

    constructor(attr: {
        message?: string,
        traceback?: string,
        issues?: AppException[]
    } = {}) {
        super({
            message: attr.message ?? NotFoundException.defaultMessage,
            name: NotFoundException.defaultName,
            traceback: attr.traceback,
            issues: attr.issues
        })
    }
}