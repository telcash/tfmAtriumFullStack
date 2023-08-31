import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AppRoutingModule } from '../app-routing.module';


/**
 * Module encargado de funciones de autenticación
 */
@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    UpdatePasswordComponent,
  ],
  providers: [
    AuthService,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    UpdatePasswordComponent,
  ]
})
export class AuthModule { }
