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
import { AddressEditComponent } from './address-edit/address-edit.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    AddressCreateComponent,
    AddressCardComponent,
    AddressGalleryComponent,
    AddressEditComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ]
})
export class AddressesModule { }
