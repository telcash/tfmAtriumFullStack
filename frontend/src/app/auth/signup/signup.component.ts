import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { concatMap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtTokens } from '../models/jwt-tokens';

/**
 * Componente que gestiona el formulario de registro de un nuevo usuario
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupErrorMessage = '';

  // Definición del formulario de registro de un nuevo usuario
  signupForm = new FormGroup({
    'firstName': new FormControl('', {nonNullable: true, validators: [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]}),
    'lastName': new FormControl('', {nonNullable: true, validators: [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]}),
    'email': new FormControl('', {nonNullable: true, validators: [
      Validators.required,
      Validators.email,
    ]}),
    'password': new FormControl('',{nonNullable: true, validators: [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])(?!.*¿)([^\s]){8,16}$/),
    ]}),
    'mobile': new FormControl('', {nonNullable: true, validators: [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(15),
    ]}),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  /**
   * Envía los datos del formulario para registro de un nuevo usuario
   */
  onSubmit() {

    if(this.signupForm.valid) {

      // LLamada al servicio para la solicitud al API de registro de usuario
      this.authService.signup(this.signupForm.getRawValue()).pipe(

        // LLamada al servicio para la solicitud al API de inicio de sesión
        concatMap(
          user => this.authService.login(user.email, this.signupForm.value.password!),
        )
      ).subscribe({

        // Si el inicio de sesión es exitoso se obtienen los tokens de acceso y de refrescamiento
        next: (data: JwtTokens) => {

          // Almacena los tokens
          this.authService.setTokens(data);

          // Obtiene el rol del usuario que inicia sesión
          const role = this.authService.getUserRole();

          // Envia un evento de inicio de sesión de un usuario
          this.authService.userLoggedIn.next(role);

          // Redirige al home
          this.router.navigateByUrl('/');
        },

        // Si el inicio de sesión no es exitoso imprime un mensaje de error
        error: error => {
          if(error.error.response.code && error.error.response.code === 'P2002') {
            this.signupErrorMessage = 'El usuario ya se encuentra registrado';
          } else {
            this.signupErrorMessage = 'Ha ocurrido un error en el registro, intente nuevamente'
          }
        } 
      });
    }

  }

  /**
   * Método que genera mensajes de error para el formulario
   * Genera mensajes en el campo 'firstName' cuando no cumple alguna validación
   * @returns {string} - Mensaje de error
   */
  getFirstNameErrors() {
    if(this.signupForm.controls.firstName.hasError('required')) {
      return 'Debe ingresar un nombre';
    }
    if(this.signupForm.controls.firstName.hasError('minlength')) {
      return 'El nombre debe tener al menos dos caracteres';
    }
    return this.signupForm.controls.firstName.hasError('maxlength') ? 'El nombre no puede tener más de 50 caracteres' : '';
  }

  /**
   * Método que genera mensajes de error para el formulario
   * Genera mensajes en el campo 'lastName' cuando no cumple alguna validación
   * @returns {string} - Mensaje de error
   */
  getLastNameErrors() {
    if(this.signupForm.controls.lastName.hasError('required')) {
      return 'Debe ingresar un nombre';
    }
    if(this.signupForm.controls.lastName.hasError('minlength')) {
      return 'El apellido debe tener al menos dos caracteres';
    }
    return this.signupForm.controls.lastName.hasError('maxlength') ? 'El apellido no puede tener más de 50 caracteres' : '';
  }

  /**
   * Método que genera mensajes de error para el formulario
   * Genera mensajes en el campo 'email' cuando no cumple alguna validación
   * @returns {string} - Mensaje de error
   */
  getEmailErrors() {
    if(this.signupForm.controls.email.hasError('required')) {
      return 'Debe ingresar un email';
    }
    return this.signupForm.controls.email.hasError('email') ? 'No es un email válido' : '';
  }

  /**
   * Método que genera mensajes de error para el formulario
   * Genera mensajes en el campo 'password' cuando no cumple alguna validación
   * @returns {string} - Mensaje de error
   */
  getPasswordErrors() {
    if(this.signupForm.controls.password.hasError('required')) {
      return 'Debe ingresar una contraseña'
    }
    return this.signupForm.controls.password.hasError('pattern') ? 'No es un password válido' : '';
  }
}
