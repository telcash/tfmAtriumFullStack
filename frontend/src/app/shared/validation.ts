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
}