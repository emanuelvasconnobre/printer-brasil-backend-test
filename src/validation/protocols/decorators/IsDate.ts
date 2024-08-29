import { Transform, TransformFnParams } from "class-transformer";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from "class-validator";
import { applyDecorators } from "@modules/utils";

export function CustomIsDate(
  config: ValidationOptions = {}
): PropertyDecorator {
  return applyDecorators(
    function (target: Object, propertyName: string | symbol) {
      registerDecorator({
        name: "isDate",
        target: target.constructor,
        propertyName: propertyName as string,
        options: {
          message: ({ property }: ValidationArguments) => {
            return `The field ${property} must have a valid date format.`;
          },
          ...config,
        },
        validator: {
          validate(value: any) {
            return value instanceof Date && !isNaN(value.getTime());
          },
        },
      });
    },
    Transform(({ value }: TransformFnParams) => value && new Date(value))
  );
}
