import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customPhone', async: false })
export class IsPhoneValidator implements ValidatorConstraintInterface {
  validate(phone: string) {
    // Implement custom phone number validation logic here
    // Example: Validate phone numbers with dynamic country code prefix
    const regex = /^(\+?\d{1,3})?\d{9,10}$/;
    return regex.test(phone);
  }

  defaultMessage(args: ValidationArguments) {
    // Default error message if validation fails
    return `Invalid phone number: ${args.value}`;
  }
}
