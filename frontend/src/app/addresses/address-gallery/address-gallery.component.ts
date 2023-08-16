import { Component, OnInit } from '@angular/core';
import { AddressesService } from '../addresses.service';
import { Address } from '../models/address';

@Component({
  selector: 'app-address-gallery',
  templateUrl: './address-gallery.component.html',
  styleUrls: ['./address-gallery.component.css']
})
export class AddressGalleryComponent implements OnInit {

  addresses!: Address[];

  constructor(private addressesService: AddressesService) {}

  ngOnInit() {
    this.addressesService.getAddresses().subscribe(
      (data) => {
        this.addresses = data;
      }
    )
  }
}
