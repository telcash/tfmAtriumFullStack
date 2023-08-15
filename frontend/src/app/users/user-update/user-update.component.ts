import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/models/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

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
  
  ngOnInit(): void {
    this.usersService.getUser().subscribe(
      (data) => {
        this.user = data;
        this.setFormValues(this.user);
      }
    )
  }

  onSubmit() {
    this.usersService.updateUser(this.userUpdateForm.value).subscribe();
  }

  enableEdit() {
    this.isEditable = true;
    this.userUpdateForm.controls.firstName.enable();
    this.userUpdateForm.controls.lastName.enable();
    this.userUpdateForm.controls.mobile.enable();
  }

  cancelEdit() {
    this.isEditable = false;
    this.userUpdateForm.controls.firstName.disable();
    this.userUpdateForm.controls.lastName.disable();
    this.userUpdateForm.controls.mobile.disable();
    this.setFormValues(this.user);
  }

  setFormValues(user: User) {
    this.userUpdateForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
    })
  }

  getFirstNameErrors() {
    if(this.userUpdateForm.controls.firstName.hasError('required')) {
      return 'Debe ingresar un nombre';
    }
    if(this.userUpdateForm.controls.firstName.hasError('minlength')) {
      return 'El nombre debe tener al menos dos caracteres';
    }
    return this.userUpdateForm.controls.firstName.hasError('maxlength') ? 'El nombre no puede tener más de 50 caracteres' : '';
  }

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
