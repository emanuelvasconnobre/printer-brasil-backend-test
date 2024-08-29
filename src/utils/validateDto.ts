import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { BadRequestHttpException } from "@modules/exceptions/http-exceptions/bad-request.http-exception";
import {
  ValidationException,
  ValidationField,
} from "@modules/exceptions/app-exceptions";

export async function validateDto<T extends object>(
  dtoClass: new () => T,
  plainObject: object
): Promise<T> {
  const dtoInstance = plainToClass(dtoClass, plainObject);
  const errors = await validate(dtoInstance);

  if (errors.length > 0) {
    const validationErrors = errors.map(
      (error) =>
        new ValidationField({
          target: error.property,
          value: error.value,
          message: error.constraints
            ? Object.values(error.constraints)[0]
            : "Invalid value",
        })
    );

    throw new BadRequestHttpException({
      details: new ValidationException({
        fields: validationErrors,
      }),
    });
  }

  return dtoInstance;
}
