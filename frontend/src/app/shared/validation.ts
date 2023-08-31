import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

/**
 * Clase que contiene validadores personalizados para los formularios
 */
export default class Validation {

  /**
   * Valida que la entrada del campo del formulario es un número
   * @param control 
   * @returns 
   */
  numberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (isNaN(control?.value)) {
      return {
        number: true
      }
    }
    return null;
  }

  /**
   * Valida que un campo 'newPassword' y un campo 'confirmationPassword' coinciden
   * @param control 
   * @returns 
   */
  passwordRelationsValidator : ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword');
    const confirmationPassword = control.get('confirmationPassword');
    return newPassword && confirmationPassword && newPassword.value === confirmationPassword.value ? null : {passwordRelations: true}
  
  };
}