import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressCreateComponent } from './address-create/address-create.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AddressCardComponent } from './address-card/address-card.component';
import { AddressGalleryComponent } from './address-gallery/address-gallery.component';
import { AddressDeleteDialogComponent } from './address-delete-dialog/address-delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AddressCreateComponent,
    AddressCardComponent,
    AddressGalleryComponent,
    AddressDeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class AddressesModule { }
