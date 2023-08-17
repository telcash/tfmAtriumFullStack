import { Component, OnInit } from '@angular/core';
import { AddressesService } from '../addresses.service';
import { Address } from '../models/address';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-gallery',
  templateUrl: './address-gallery.component.html',
  styleUrls: ['./address-gallery.component.css']
})
export class AddressGalleryComponent implements OnInit {

  addresses!: Address[];

  constructor(
    private addressesService: AddressesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.addressesService.getAddresses().subscribe(
      (data) => {
        this.addresses = data;
      }
    )
  }

  addressDeleted() {
    const url = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
      this.router.navigate([`/${url}`])
    })
  }
}
