import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../auth/models/user';
import { UsersService } from 'src/app/users/users.service';
import { Router } from '@angular/router';

/**
 * Componente que gestiona el formulario para agregar a un nuevo administrador al sistema
 */
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {

  addAdminErrorMessage = '';

  // Definición del formulario para agregar a un nuevo administrador al sistema
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

  /**
   * Realiza el envío de los datos del formulario
   */
  onSubmit(): void {

    // Objeto con los datos del formulario para el envío al API
    const user: User = {
      firstName: this.addAdminForm.value.firstName!,
      lastName: this.addAdminForm.value.lastName!,
      email: this.addAdminForm.value.email!,
      password: this.addAdminForm.value.password!,
      mobile: this.addAdminForm.value.mobile!,
      role: 'ADMIN',
    }

    // Llamada al servicio para la solicitud al API de la creación del usuario
    this.usersService.createUser(user).subscribe({

      // Si la creación es exitosa navega al listado de usuarios
      next: () => this.router.navigateByUrl('admin/users'),

      // Si hay un error en la creación del usuario generamos un mensaje de error para el cliente
      error: error => {
        if(error.error.response.code && error.error.response.code === 'P2002') {
          this.addAdminErrorMessage = 'Ya existe un administrador registrado con ese correo electrónico';
        } else {
          this.addAdminErrorMessage = 'Ha ocurrido un error en el registro, intente nuevamente'
        }
      } 
    });
  }

  /**
   * Método que genera mensajes de error para el formulario
   * Genera mensajes en el campo 'firstName' cuando no cumple alguna validación
   * @returns {string} - Mensaje de error
   */
  getFirstNameErrors(): string {
    if(this.addAdminForm.controls.firstName.hasError('required')) {
      return 'Debe ingresar un nombre';
    }
    if(this.addAdminForm.controls.firstName.hasError('minlength')) {
      return 'El nombre debe tener al menos dos caracteres';
    }
    return this.addAdminForm.controls.firstName.hasError('maxlength') ? 'El nombre no puede tener más de 50 caracteres' : '';
  }

  /**
   * Método que genera mensajes de error para el formulario
   * Genera mensajes en el campo 'lastName' cuando no cumple alguna validación
   * @returns {string} - Mensaje de error
   */
  getLastNameErrors(): string {
    if(this.addAdminForm.controls.lastName.hasError('required')) {
      return 'Debe ingresar un nombre';
    }
    if(this.addAdminForm.controls.lastName.hasError('minlength')) {
      return 'El apellido debe tener al menos dos caracteres';
    }
    return this.addAdminForm.controls.lastName.hasError('maxlength') ? 'El apellido no puede tener más de 50 caracteres' : '';
  }

  /**
   * Método que genera mensajes de error para el formulario
   * Genera mensajes en el campo 'email' cuando no cumple alguna validación
   * @returns {string} - Mensaje de error
   */
  getEmailErrors(): string {
    if(this.addAdminForm.controls.email.hasError('required')) {
      return 'Debe ingresar un email';
    }
    return this.addAdminForm.controls.email.hasError('email') ? 'No es un email válido' : '';
  }

  /**
   * Método que genera mensajes de error para el formulario
   * Genera mensajes en el campo 'password' cuando no cumple alguna validación
   * @returns {string} - Mensaje de error
   */
  getPasswordErrors(): string {
    if(this.addAdminForm.controls.password.hasError('required')) {
      return 'Debe ingresar una contraseña'
    }
    return this.addAdminForm.controls.password.hasError('pattern') ? 'No es un password válido' : '';
  }
}
