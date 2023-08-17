import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Address } from '../models/address';
import { AddressesService } from '../addresses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css']
})
export class AddressCreateComponent {

  addressCreateForm = new FormGroup({
    'street': new FormControl(''),
    'postalCode': new FormControl(''),
    'city': new FormControl(''),
    'country': new FormControl(''),
  });

  constructor(
    private addressesService: AddressesService,
    private router: Router,
  ) {}

  onSubmit() {
    const address: Partial<Address> = {
      street: this.addressCreateForm.value.street ?? '',
      postalCode: this.addressCreateForm.value.postalCode ?? '',
      city: this.addressCreateForm.value.city ?? '',
      country: this.addressCreateForm.value.country ?? ''
    }

    this.addressesService.createAddress(address).subscribe(
      () => {
        this.goToAddresses()
      }
    );
  }

  goToAddresses() {
    this.router.navigateByUrl('users/myprofile/addresses');
  }

}
