import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/models/user';
import { UsersService } from '../users.service';

/**
 * Componente que gestiona el formulario de edición de datos de un usuario
 */
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  // Definición del formulario de actualización de datos de un usuario
  userUpdateForm = new FormGroup({
    'firstName': new FormControl({value:'', disabled: true}, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    'lastName': new FormControl({value:'', disabled: true}, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    'email': new FormControl({value:'', disabled: true}, [
      Validators.email,
    ]),
    'mobile': new FormControl({value:'', disabled: true}, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(15),
    ])
  });
  
  user!: User;
  isEditable: boolean = false;
  
  constructor(private usersService: UsersService) {}
  
  /**
   * Inicialización del componente
   */
  ngOnInit(): void {

    // Llamada al servicio para la solicitud al API de los datos del usuario
    this.usersService.getUser().subscribe(
      user => {

        // Inicializa el atributo user
        this.user = user;

        // Inicializa los campos del formulario
        this.setFormValues(this.user);
      }
    )
  }

  /**
   * Envía los datos del formulario
   */
  onSubmit() {

    if(this.userUpdateForm.valid) {
      // LLamada al servicio para la solicitud al API de actualización del formulario
      this.usersService.updateUser(this.userUpdateForm.value).subscribe();
    } 
  }

  /**
   * Método que desbloquea los campos del formulario para su edición
   */
  enableEdit() {
    this.isEditable = true;
    this.userUpdateForm.controls.firstName.enable();
    this.userUpdateForm.controls.lastName.enable();
    this.userUpdateForm.controls.mobile.enable();
  }

  /**
   * Método que bloquea los campos del formulario y lo resetea a los valores originales del usuario
   */
  cancelEdit() {
    this.isEditable = false;
    this.userUpdateForm.controls.firstName.disable();
    this.userUpdateForm.controls.lastName.disable();
    this.userUpdateForm.controls.mobile.disable();
    this.setFormValues(this.user);
  }

  /**
   * Método que carga los campos del formulario con los datos del objeto user
   * @param {User} user 
   */
  setFormValues(user: User) {
    this.userUpdateForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
    })
  }

  /**
   * Método que genera mensajes de error en el campo 'firstName' del formulario 
   * @returns 
   */
  getFirstNameErrors() {
    if(this.userUpdateForm.controls.firstName.hasError('required')) {
      return 'Debe ingresar un nombre';
    }
    if(this.userUpdateForm.controls.firstName.hasError('minlength')) {
      return 'El nombre debe tener al menos dos caracteres';
    }
    return this.userUpdateForm.controls.firstName.hasError('maxlength') ? 'El nombre no puede tener más de 50 caracteres' : '';
  }

  /**
   * Método que genera mensajes de error en el campo 'lastName' del formulario 
   * @returns 
   */
  getLastNameErrors() {
    if(this.userUpdateForm.controls.lastName.hasError('required')) {
      return 'Debe ingresar un apellido';
    }
    if(this.userUpdateForm.controls.lastName.hasError('minlength')) {
      return 'El apellido debe tener al menos dos caracteres';
    }
    return this.userUpdateForm.controls.lastName.hasError('maxlength') ? 'El apellido no puede tener más de 50 caracteres' : '';
  }
}
