export function applyDecorators(
  ...decorators: PropertyDecorator[]
): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    for (const decorator of decorators) {
      decorator(target, propertyKey);
    }
  };
}
