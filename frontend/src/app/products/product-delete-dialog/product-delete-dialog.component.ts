import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.css']
})
export class ProductDeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<ProductDeleteDialogComponent>) {}
  onConfirmClick() {
    this.dialogRef.close(true);
  }
}
