import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    'street': new FormControl('', [
      Validators.required,
    ]),
    'postalCode': new FormControl('', [
      Validators.required,
    ]),
    'city': new FormControl('', [
      Validators.required,
    ]),
    'country': new FormControl('', [
      Validators.required,
    ]),
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
