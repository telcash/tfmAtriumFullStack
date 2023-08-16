import { Component, Input } from '@angular/core';
import { Address } from '../models/address';
import { AddressesService } from '../addresses.service';
import { MatDialog } from '@angular/material/dialog';
import { AddressDeleteDialogComponent } from '../address-delete-dialog/address-delete-dialog.component';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css']
})
export class AddressCardComponent {
  @Input() address!: Address;

  constructor(
    private addressesService: AddressesService,
    private dialog: MatDialog,
  ) {
  }

  deleteAddress() {
    this.addressesService.deleteAddress(this.address.id).subscribe();
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(AddressDeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteAddress();
      }
    })
  }
}
