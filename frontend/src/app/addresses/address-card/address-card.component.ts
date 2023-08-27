import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../models/address';
import { AddressesService } from '../addresses.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { confirmDialogOptions } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css']
})
export class AddressCardComponent {
  @Input() address!: Address;
  @Output() addressDeleted = new EventEmitter();

  constructor(
    private addressesService: AddressesService,
    private dialog: MatDialog,
  ) {
  }

  deleteAddress() {
    this.addressesService.deleteAddress(this.address.id).subscribe();
    this.addressDeleted.emit();
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar dirección',
        question: '¿Desea eliminar la dirección?',
      },
      ...confirmDialogOptions,
    })

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteAddress();
      }
    })
  }
}
