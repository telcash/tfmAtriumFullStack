import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { JwtTokens } from '../models/jwt-tokens';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/carts/carts.service';
import { CookieService } from 'ngx-cookie-service';

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
    private cartsService: CartsService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  /**
   * Envía los datos del formulario para el inicio de sesión
   */
  onSubmit(): void {

    this.cookieService.deleteAll();

    // Extrae del formulario las credenciales para inicio de sesión
    const email: string = this.loginForm.value.email!;
    const password: string = this.loginForm.value.password!;

    // LLamada al servicio para la solicitud al API de inicio de sesión
    this.authService.login(email, password).subscribe({

      // Si el inicio de sesión no es exitoso obtenemos los tokens de acceso y de refrescamiento
      next: (data: JwtTokens) => {

        // Almacenamos los tokens
        this.authService.setTokens(data);

        // Obtenemos el rol del usuario que inicia sesión
        const role = this.authService.getUserRole();

        // Enviamos un evento de inicio de sesión de un usuario
        this.authService.userLoggedIn.next(role);

        // 
        this.cartsService.findAllItems().subscribe();
        if(role === 'ADMIN') {
          this.router.navigateByUrl('admin/products')
        } else {
          this.router.navigateByUrl('/');
        }
      },

      // Si el inicio de sesión es exitoso
      error: () => this.loginErrorMessage = 'Email o contraseña incorrecta'
    }
    )
  }

  getEmailErrors() {
    if(this.loginForm.controls.email.hasError('required')) {
      return 'Debe ingresar un email';
    }
    return this.loginForm.controls.email.hasError('email') ? 'No es un email válido' : '';
  }

  getPasswordErrors() {
    if(this.loginForm.controls.password.hasError('required')) {
      return 'Debe ingresar una contraseña'
    }
    return this.loginForm.controls.password.hasError('pattern') ? 'No es un password válido' : '';
  }


}
