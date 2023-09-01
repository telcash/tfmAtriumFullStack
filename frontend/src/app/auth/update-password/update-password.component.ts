import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import Validation from 'src/app/shared/validation';


/**
 * Componente que gestiona el formulario de actualización de contraseña de un usuario
 */
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  
  // Propiedad para hacer visible o no el formulario
  updateFormActive: boolean = false;

  // Validadores para el formulario
  valid: Validation = new Validation()
  passwordValidators = [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])(?!.*¿)([^\s]){8,16}$/)];

  // Definición del formulario de cambio de contraseña de un usuario
  updatePasswordForm = new FormGroup({
    'password': new FormControl('', this.passwordValidators),
    'newPassword': new FormControl('', this.passwordValidators),
    'confirmationPassword': new FormControl('',this.passwordValidators),
  }, {
    validators: this.valid.passwordRelationsValidator,
  })

  constructor(private authService: AuthService) {}

  /**
   * Envía los datos del formulario para actualización de contraseña de un usuario
   */
  onSubmit() {

    if(this.updatePasswordForm.valid) {

      // Llamada al servicio para la solicitud al API de actualización de contraseña
      this.authService.updatePassword(
        this.updatePasswordForm.controls.password.value!,
        this.updatePasswordForm.controls.newPassword.value!,
        this.updatePasswordForm.controls.confirmationPassword.value!,
      ).subscribe();
    }
  }

  /**
   * Método que oculta el formulario y limpia sus valores
   */
  cancelPasswordUpdate() {
    this.updatePasswordForm.reset();
    this.updateFormActive = false;
  }

  /**
   * Método que hace visible el formulario
   */
  activatePasswordUpdateForm() {
    this.updateFormActive = true;
  }

  /**
   * Método que genera mensajes de error para el formulario
   * Genera mensajes en los campos de contraseñas
   * @returns {string} - Mensaje de error
   */
  getPasswordErrors(formControl: FormControl): string {
    if(formControl.hasError('required')) {
      return 'Debe ingresar una contraseña'
    }
    if(formControl.hasError('confirmation')) {
      return 'No coincide con la nueva contraseña'
    }
    return formControl.hasError('pattern') ? 'No es una contraseña válida' : '';
  }

  /**
   * Método que genera mensajes de error para el formulario
   * Genera un mensaje cuando no hay coincidencia entre la nueva contraseña y la confirmación
   * @returns {string} - Mensaje de error
   */
  getPasswordRelationsErrors(): string {
    return this.updatePasswordForm.hasError('passwordRelations') ? 'La nueva contraseña y su confirmación no coinciden' : ''
  }

}
