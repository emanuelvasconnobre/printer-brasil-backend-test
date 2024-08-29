export abstract class AppException extends Error {
  name: string;
  message: string;
  traceback?: string;
  issues?: AppException[];

  static isDebugModeEnable = process.env["DEBUG"] == "true";

  constructor(attr: {
    name: string;
    message: string;
    traceback?: string;
    issues?: AppException[];
  }) {
    super(attr.message);
    this.name = attr.name;
    this.message = attr.message;
    this.traceback = attr.traceback;
    this.issues = attr.issues;
  }

  toString() {
    return `Exception: ${this.message} - ${Date.now().toString()} ${
      AppException.isDebugModeEnable && `\n Traceback: \n${this.traceback}`
    }`;
  }

  serialize(): {
    name: string;
    message: string;
    traceback?: string;
    issues?: ReturnType<AppException["serialize"]>[];
  } {
    return {
      name: this.name,
      message: this.message,
      traceback: AppException.isDebugModeEnable ? this.traceback : undefined,
      issues: this.issues?.map((issue) => issue.serialize()),
    };
  }
}
