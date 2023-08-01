import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { JwtTokens } from '../models/jwt-tokens';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    'email': new FormControl(''),
    'password': new FormControl(''),
  });

  constructor(private authService: AuthService) {}

  onSubmit() {
    const email: string = this.loginForm.value.email ? this.loginForm.value.email : '';
    const password: string = this.loginForm.value.password ? this.loginForm.value.password : '';
    this.authService.login(email, password).subscribe(
      (data: JwtTokens) => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      }
    );
  }
}
