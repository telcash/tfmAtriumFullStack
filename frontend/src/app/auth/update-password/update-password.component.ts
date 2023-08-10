import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

export const passwordRelationsValidator : ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmationPassword = control.get('confirmationPassword');
  return newPassword && confirmationPassword && newPassword.value === confirmationPassword.value ? null : {passwordRelations: true}

};

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  
  updateFormActive: boolean = false;

  passwordValidators = [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])(?!.*¿)([^\s]){8,16}$/)];

  updatePasswordForm = new FormGroup({
    'password': new FormControl('', this.passwordValidators),
    'newPassword': new FormControl('', this.passwordValidators),
    'confirmationPassword': new FormControl('',this.passwordValidators),
  }, {
    validators: passwordRelationsValidator
  })

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.updatePassword(
      this.updatePasswordForm.controls.password.value ?? '',
      this.updatePasswordForm.controls.newPassword.value ?? '',
      this.updatePasswordForm.controls.confirmationPassword.value ?? '',
    ).subscribe();
  }

  cancelPasswordUpdate() {
    this.updateFormActive = false;
  }

  activatePasswordUpdateForm() {
    this.updateFormActive = true;
  }

  getPasswordErrors(formControl: FormControl) {
    if(formControl.hasError('required')) {
      return 'Debe ingresar una contraseña'
    }
    if(formControl.hasError('confirmation')) {
      return 'No coincide con el nuevo password'
    }
    return formControl.hasError('pattern') ? 'No es un password válido' : '';
  }

  getPasswordRelationsErrors() {
    return this.updatePasswordForm.hasError('passwordRelations') ? 'La nueva contraseña y su confirmación no coinciden' : ''
  }

}
