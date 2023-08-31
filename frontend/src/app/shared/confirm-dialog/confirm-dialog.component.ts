import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Interface que modela la data del dialogo
 */
export interface DialogData {
  title: string;
  question: string;
}

/**
 * Constante con las opciones de tamaño y animación del diálogo
 */
export const confirmDialogOptions = {
  width: '250px',
  enterAnimationDuration: '100ms',
  exitAnimationDuration: '100ms',
}

/**
 * Componente que gestiona el diálogo de confirmación
 */
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  /**
   * Método que envía true cuando el diálogo confirma afirmativamente
   */
  onConfirmClick() {
    this.dialogRef.close(true);
  }
}
