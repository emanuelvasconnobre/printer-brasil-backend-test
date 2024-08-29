import { StatusCodes } from "http-status-codes";
import { AppException } from "./app-exception";

type StatusCodeName = keyof typeof StatusCodes;

export class HttpException extends Error {
  message: string;
  status: string;
  statusCode: number;
  detail: AppException;

  constructor(attr: {
    message: string;
    status?: StatusCodeName;
    detail: AppException;
  }) {
    super(attr.message);
    this.message = attr.message;
    this.status = attr.status ?? StatusCodes.INTERNAL_SERVER_ERROR.toString();
    this.statusCode = attr.status
      ? StatusCodes[attr.status]
      : StatusCodes["INTERNAL_SERVER_ERROR"];
    this.detail = attr.detail;
  }

  toString() {
    return `${this.status.toString()} ${this.statusCode}: ${
      this.message
    } - ${Date.now().toString()}`;
  }

  serialize() {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
      detail: this.detail.serialize(),
    };
  }
}
