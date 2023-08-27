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
  displayedColumns = ['id', 'role', 'firstName', 'lastName', 'email', 'mobile', 'delete'];
  users!: User[];

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
      this.getUsersList();
  }

  deleteUser(userId: number) {
    this.usersService.deleteUser(userId).subscribe(() => {
      this.getUsersList();
    })
  }

  getUsersList() {
    this.usersService.getAllUsers().subscribe(
      data => {
        this.users = data;
      }
    )
  }

  openDeleteDialog(userId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar usuario',
        question: '¿Desea eliminar el usuario?',
      },
      ...confirmDialogOptions,
    })

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        this.deleteUser(userId);
      }
    })
  }

}
