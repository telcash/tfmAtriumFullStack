import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export default class Validation {
  numberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (isNaN(control?.value)) {
      return {
        number: true
      }
    }
    return null;
  }

  passwordRelationsValidator : ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword');
    const confirmationPassword = control.get('confirmationPassword');
    return newPassword && confirmationPassword && newPassword.value === confirmationPassword.value ? null : {passwordRelations: true}
  
  };
}