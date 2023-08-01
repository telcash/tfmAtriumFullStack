import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { JwtTokens } from '../models/jwt-tokens';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('',[
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])(?!.*¿)([^\s]){8,16}$/)
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const email: string = this.loginForm.value.email ? this.loginForm.value.email : '';
    const password: string = this.loginForm.value.password ? this.loginForm.value.password : '';

    this.authService.login(email, password).subscribe(
      (data: JwtTokens) => {
        this.authService.setTokens(data);
        this.authService.userLoggedIn.next();
        this.router.navigate(['']);
      }
    );
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
