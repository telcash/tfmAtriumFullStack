import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-delete-dialog',
  templateUrl: './category-delete-dialog.component.html',
  styleUrls: ['./category-delete-dialog.component.css']
})
export class CategoryDeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<CategoryDeleteDialogComponent>) {}
  onConfirmClick() {
    this.dialogRef.close(true);
  }
}
