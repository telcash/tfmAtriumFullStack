import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-address-delete-dialog',
  templateUrl: './address-delete-dialog.component.html',
  styleUrls: ['./address-delete-dialog.component.css']
})
export class AddressDeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<AddressDeleteDialogComponent>) {}
  onConfirmClick() {
    this.dialogRef.close(true);
  }
}
