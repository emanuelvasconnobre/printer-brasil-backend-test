import {
  isEmail,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import { applyDecorators } from "@modules/utils";

export function CustomIsEmail(
  config: ValidationOptions = {}
): PropertyDecorator {
  return applyDecorators(function (
    target: Object,
    propertyName: string | symbol
  ) {
    registerDecorator({
      name: "isEmail",
      target: target.constructor,
      propertyName: propertyName as string,
      options: {
        message: ({ property }: ValidationArguments) => {
          return `The field ${property} must have a valid email format.`;
        },
        ...config,
      },
      validator: {
        validate(value: any) {
          return isEmail(value);
        },
      },
    });
  });
}
