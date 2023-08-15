import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './user-delete-dialog.component.html',
  styleUrls: ['./user-delete-dialog.component.css']
})
export class UserDeleteDialogComponent {

  constructor(private dialogRef: MatDialogRef<UserDeleteDialogComponent>) {}
  onConfirmClick() {
    this.dialogRef.close(true);
  }
}
