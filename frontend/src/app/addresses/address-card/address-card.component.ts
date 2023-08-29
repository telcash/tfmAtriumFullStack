import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../models/address';
import { AddressesService } from '../addresses.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { confirmDialogOptions } from '../../shared/confirm-dialog/confirm-dialog.component';

/**
 * Componente que muestra una tarjeta con todos los datos de una dirección de un usuario
 */
@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css']
})
export class AddressCardComponent {
  
  // Recibe como entrada una dirección, como un objeto tipo Address 
  @Input() address!: Address;

  // Emite un evento con el id de la dirección cuando la dirección es eliminada
  @Output() addressDeleted = new EventEmitter<number>();

  constructor(
    private addressesService: AddressesService,
    private dialog: MatDialog,
  ) {
  }

  /**
   * Elimina una dirección
   */
  deleteAddress(): void {
    // Subscripción al servicio para eliminar la dirección
    this.addressesService.deleteAddress(this.address.id!).subscribe(

      // Emite un evento una vez se elimina la dirección
      () => this.addressDeleted.emit(this.address.id),
    );
  }

  /**
   * Abre un dialogo de confirmación para eliminar una dirección
   */
  openDeleteDialog(): void {

    // Crea el componente que genera el diálogo
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar dirección',
        question: '¿Desea eliminar la dirección?',
      },
      ...confirmDialogOptions,
    })

    // Si el dialogo confirma la eliminación invoca al metodo deleteAddress()
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteAddress();
      }
    })
  }
}
