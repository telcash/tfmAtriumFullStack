import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../auth/models/user';
import { UsersService } from 'src/app/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {

  addAdminErrorMessage = '';

  addAdminForm = new FormGroup({
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
    private usersService: UsersService,
    private router: Router,
  ) {}

  onSubmit() {
    const user: User = {
      firstName: this.addAdminForm.value.firstName ?? '',
      lastName: this.addAdminForm.value.lastName ?? '',
      email: this.addAdminForm.value.email ?? '',
      password: this.addAdminForm.value.password ?? '',
      mobile: this.addAdminForm.value.mobile ?? '',
      role: 'ADMIN',
    }
    this.usersService.createUser(user).subscribe({
      next: () => this.router.navigateByUrl('admin/users'),
      error: error => {
        if(error.error.response.code && error.error.response.code === 'P2002') {
          this.addAdminErrorMessage = 'Ya existe un administrador registrado con ese correo electrónico';
        } else {
          this.addAdminErrorMessage = 'Ha ocurrido un error en el registro, intente nuevamente'
        }
      } 
    });
  }

  getFirstNameErrors() {
    if(this.addAdminForm.controls.firstName.hasError('required')) {
      return 'Debe ingresar un nombre';
    }
    if(this.addAdminForm.controls.firstName.hasError('minlength')) {
      return 'El nombre debe tener al menos dos caracteres';
    }
    return this.addAdminForm.controls.firstName.hasError('maxlength') ? 'El nombre no puede tener más de 50 caracteres' : '';
  }

  getLastNameErrors() {
    if(this.addAdminForm.controls.lastName.hasError('required')) {
      return 'Debe ingresar un nombre';
    }
    if(this.addAdminForm.controls.lastName.hasError('minlength')) {
      return 'El apellido debe tener al menos dos caracteres';
    }
    return this.addAdminForm.controls.lastName.hasError('maxlength') ? 'El apellido no puede tener más de 50 caracteres' : '';
  }

  getEmailErrors() {
    if(this.addAdminForm.controls.email.hasError('required')) {
      return 'Debe ingresar un email';
    }
    return this.addAdminForm.controls.email.hasError('email') ? 'No es un email válido' : '';
  }

  getPasswordErrors() {
    if(this.addAdminForm.controls.password.hasError('required')) {
      return 'Debe ingresar una contraseña'
    }
    return this.addAdminForm.controls.password.hasError('pattern') ? 'No es un password válido' : '';
  }
}
