import { AppException } from '../protocols/app-exception';

export class ValidationField {
    target: string;
    value: any;
    message: string;

    constructor(attr: { target: string; value: any; message: string }) {
        this.target = attr.target;
        this.value = attr.value;
        this.message = attr.message;
    }
}

export class ValidationException extends AppException {
    static defaultName = 'VALIDATION_EXCEPTION';
    static defaultMessage = 'The data received are not valid.';

    fields: ValidationField[];

    constructor(
        attr: {
            message?: string;
            traceback?: string;
            issues?: AppException[];
            fields?: ValidationField[];
        } = {},
    ) {
        super({
            message: attr.message ?? ValidationException.defaultMessage,
            name: ValidationException.defaultName,
            traceback: attr.traceback,
            issues: attr.issues,
        });
        this.fields = attr.fields ?? [];
    }

    serialize() {
        return {
            name: this.name,
            message: this.message,
            traceback: AppException.isDebugModeEnable ? this.traceback : undefined,
            issues: this.issues?.map((issue) => issue.serialize()),
            fields: this.fields,
        };
    }
}
