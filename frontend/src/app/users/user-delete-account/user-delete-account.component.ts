import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, confirmDialogOptions } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { UsersService } from '../users.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

/**
 * Componente que gestiona el formulario de eliminación de cuenta de un usuario
 */
@Component({
  selector: 'app-user-delete-account',
  templateUrl: './user-delete-account.component.html',
  styleUrls: ['./user-delete-account.component.css']
})
export class UserDeleteAccountComponent {

  // Definición del formulario de eliminación de cuenta de un usuario
  deleteAccountForm = new FormGroup({
    'email': new FormControl('', [
      Validators.required, Validators.email,
    ]),
    'password': new FormControl('', [
      Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])(?!.*¿)([^\s]){8,16}$/)
    ]),
  })

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
  ) {}

  /**
   * Envía los datos del formulario para eliminación de la cuenta de un usuario
   */
  onSubmit() {

    if(this.deleteAccountForm.valid) {

      // Extrae del formulario las credenciales para inicio de sesión
      const email: string = this.deleteAccountForm.value.email!;
      const password: string = this.deleteAccountForm.value.password!;

      this.usersService.deleteUserAuth(email, password).subscribe(
        () => {
          // Elimina los tokens de acceso y de refrescamiento de LocalStorage
          this.authService.deleteTokens();

          // Emite un evento indicando que se cerró la sesuón de un usuario
          this.authService.userLoggedOut.next(null);

          // Navega al home de la aplicación
          this.router.navigateByUrl('/');
        }
      )
    }

    

  }

  /**
   * Método que abre un dialogo de confirmación de eliminación de cuenta
   */
  openOnSubmitDialog() {
    // Crea el componente que general el diálogo
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar cuenta',
        question: '¿Desea eliminar su cuenta?. Este proceso es irreversible',
      },
      ...confirmDialogOptions,
    })

    // Si el diálogo cierra con una confirmación de eliminación, invoca al método onSubmit()
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.onSubmit();
      }
    })
  }

  /**
   * Método que genera mensajes de error para el formulario
   * Genera mensajes en el campo 'email' cuando no cumple alguna validación
   * @returns {string} - Mensaje de error
   */
  getEmailErrors() {
    if(this.deleteAccountForm.controls.email.hasError('required')) {
      return 'Debe ingresar un email';
    }
    return this.deleteAccountForm.controls.email.hasError('email') ? 'No es un email válido' : '';
  }

  /**
   * Método que genera mensajes de error para el formulario
   * Genera mensajes en el campo 'password' cuando no cumple alguna validación
   * @returns {string} - Mensaje de error
   */
  getPasswordErrors(): string {
    if(this.deleteAccountForm.controls.password.hasError('required')) {
      return 'Debe ingresar una contraseña'
    }
    return this.deleteAccountForm.controls.password.hasError('pattern') ? 'No es una contraseña válida' : '';
  }
}
