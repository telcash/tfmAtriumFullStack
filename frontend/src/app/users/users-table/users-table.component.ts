import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user';
import { UsersService } from '../users.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, confirmDialogOptions } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  // Definición de las columnas de la tabla
  displayedColumns = ['id', 'role', 'firstName', 'lastName', 'email', 'mobile', 'delete'];
  
  // Listado de usuarios
  users!: User[];

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
  ) {}

  /**
   * Inicialización del componente
   */
  ngOnInit(): void {
      this.getUsersList();
  }


  /**
   * Método que obtiene el listado de los usuarios
   */
  getUsersList() {

    // LLamada al servicio para solicitud al API del listado de los usuarios
    this.usersService.getAllUsers().subscribe(
      users => {

        // Inicializa el listado de usuarios
        this.users = users;
      }
    )
  }

  /**
   * Método que elimina un usuario
   * @param {number} userId - Id del usuario 
   */
  deleteUser(userId: number) {

    // LLamada al servicio para solicitud al API de eliminación de un usuario
    this.usersService.deleteUser(userId).subscribe(() => {
      this.getUsersList();
    })
  }

  /**
   * Método que abre un diálogo de confirmación de eliminación de un usuario
   * @param {number} userId - Id del usuario
   */
  openDeleteDialog(userId: number) {

    // Crea el componente que general el diálogo
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar usuario',
        question: '¿Desea eliminar el usuario?',
      },
      ...confirmDialogOptions,
    })

    // Si el diálogo cierra con una confirmación de eliminación, invoca al método deleteUser()
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.deleteUser(userId);
      }
    })
  }

}
