import { Transform, TransformFnParams } from "class-transformer";
import {
  isNumber,
  isString,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import { applyDecorators } from "@modules/utils";

export function CustomIsNumber(
  config: ValidationOptions = {}
): PropertyDecorator {
  return applyDecorators(
    function (target: Object, propertyName: string | symbol) {
      registerDecorator({
        name: "isNumber",
        target: target.constructor,
        propertyName: propertyName as string,
        options: {
          message: ({ property }: ValidationArguments) => {
            return `The field ${property} must have a valid number format.`;
          },
          ...config,
        },
        validator: {
          validate(value: any) {
            return isNumber(value, {
              maxDecimalPlaces: 0,
              allowInfinity: false,
              allowNaN: false,
            });
          },
        },
      });
    },
    Transform(({ value }: TransformFnParams) => {
      if (value) {
        return parseInt(value);
      }
      return value;
    })
  );
}
