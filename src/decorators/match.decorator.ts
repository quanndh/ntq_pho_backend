/* eslint-disable security/detect-object-injection */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [relatedPropertyName] = args.constraints;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }
}
