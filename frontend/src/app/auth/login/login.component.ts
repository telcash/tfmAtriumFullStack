import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { JwtTokens } from '../models/jwt-tokens';
import { Router } from '@angular/router';

/**
 * Componente que gestiona el formulario de inicio de sesión de un usuario
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginErrorMessage = '';

  // Definición del formulario de inicio de sesión de un usuario
  loginForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('',[
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])(?!.*¿)([^\s]){8,16}$/)
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Envía los datos del formulario para el inicio de sesión
   */
  onSubmit(): void {

    if(this.loginForm.valid) {

      // Extrae del formulario las credenciales para inicio de sesión
      const email: string = this.loginForm.value.email!;
      const password: string = this.loginForm.value.password!;
  
      // LLamada al servicio para la solicitud al API de inicio de sesión
      this.authService.login(email, password).subscribe({
  
        // Si el inicio de sesión es exitoso se obtienen los tokens de acceso y de refrescamiento
        next: (data: JwtTokens) => {
  
          // Almacena los tokens
          this.authService.setTokens(data);
  
          // Obtiene el rol del usuario que inicia sesión
          const role = this.authService.getUserRole();
  
          // Envia el valor del rol de usuario que acaba de iniciar sesión al Subject userLoogedIn.
          // userLoggedIn lo emitira a sus Observers registrados
          this.authService.userLoggedIn.next(role);
  
          // Redirige a otra página dependiendo del tipo de usuario que inicia sesión
          if(role === 'ADMIN') {
            this.router.navigateByUrl('admin/products')
          } else {
            this.router.navigateByUrl('/');
          }
        },
  
        // Si el inicio de sesión no es exitoso imprime un mensaje de error
        error: () => this.loginErrorMessage = 'Email o contraseña incorrecta',
      })
    }
  }

  /**
   * Método que genera mensajes de error para el formulario
   * Genera mensajes en el campo 'email' cuando no cumple alguna validación
   * @returns {string} - Mensaje de error
   */
  getEmailErrors() {
    if(this.loginForm.controls.email.hasError('required')) {
      return 'Debe ingresar un email';
    }
    return this.loginForm.controls.email.hasError('email') ? 'No es un email válido' : '';
  }

  /**
   * Método que genera mensajes de error para el formulario
   * Genera mensajes en el campo 'password' cuando no cumple alguna validación
   * @returns {string} - Mensaje de error
   */
  getPasswordErrors() {
    if(this.loginForm.controls.password.hasError('required')) {
      return 'Debe ingresar una contraseña'
    }
    return this.loginForm.controls.password.hasError('pattern') ? 'No es un password válido' : '';
  }


}
