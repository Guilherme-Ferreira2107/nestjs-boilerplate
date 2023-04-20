import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from './user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsNameUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  validate(userName: string, args: ValidationArguments) {
    console.info(args);
    return !!!this.userService.searchUserName(userName);
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNameUniqueConstraint,
    });
  };
}
