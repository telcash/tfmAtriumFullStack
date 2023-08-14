import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../models/user';
import { concatMap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtTokens } from '../models/jwt-tokens';
import { CookieService } from 'ngx-cookie-service';
import { CartsService } from 'src/app/carts/carts.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm = new FormGroup({
    'firstName': new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    'lastName': new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    'email': new FormControl('', [
      Validators.required,
      Validators.email]),
    'password': new FormControl('',[
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])(?!.*¿)([^\s]){8,16}$/)
    ]),
    'mobile': new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(15)
    ])
  });

  

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private cartsService: CartsService,
  ) {}

  onSubmit() {
    const user: User = {
      firstName: this.signupForm.value.firstName ?? '',
      lastName: this.signupForm.value.lastName ?? '',
      email: this.signupForm.value.email ?? '',
      password: this.signupForm.value.password ?? '',
      mobile: this.signupForm.value.mobile ?? '',
    }
    this.authService.signup(user).pipe((concatMap(
      data => {return this.authService.login(user.email, user.password)}
    ))).subscribe(
      (data: JwtTokens) => {
        this.cookieService.deleteAll();
        this.authService.setTokens(data);
        const role = this.cookieService.get('role') ?? '';
        this.authService.userLoggedIn.next(role);
        this.cartsService.findAllItems().subscribe();
        this.router.navigate(['']);
      } 
    );
  }

  getFirstNameErrors() {
    if(this.signupForm.controls.firstName.hasError('required')) {
      return 'Debe ingresar un nombre';
    }
    if(this.signupForm.controls.firstName.hasError('minlength')) {
      return 'El nombre debe tener al menos dos caracteres';
    }
    return this.signupForm.controls.firstName.hasError('maxlength') ? 'El nombre no puede tener más de 50 caracteres' : '';
  }

  getLastNameErrors() {
    if(this.signupForm.controls.lastName.hasError('required')) {
      return 'Debe ingresar un nombre';
    }
    if(this.signupForm.controls.lastName.hasError('minlength')) {
      return 'El apellido debe tener al menos dos caracteres';
    }
    return this.signupForm.controls.lastName.hasError('maxlength') ? 'El apellido no puede tener más de 50 caracteres' : '';
  }

  getEmailErrors() {
    if(this.signupForm.controls.email.hasError('required')) {
      return 'Debe ingresar un email';
    }
    return this.signupForm.controls.email.hasError('email') ? 'No es un email válido' : '';
  }

  getPasswordErrors() {
    if(this.signupForm.controls.password.hasError('required')) {
      return 'Debe ingresar una contraseña'
    }
    return this.signupForm.controls.password.hasError('pattern') ? 'No es un password válido' : '';
  }
}
