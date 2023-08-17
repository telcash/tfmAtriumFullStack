import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Address } from '../models/address';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressesService } from '../addresses.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {

  addressEditForm = new FormGroup({
    'street': new FormControl(''),
    'postalCode': new FormControl(''),
    'city': new FormControl(''),
    'country': new FormControl(''),
  });

  address!: Address;

  constructor(
    private addressesService: AddressesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {} 

  ngOnInit() {
    this.loadInitialValues();
  }

  onSubmit() {
    const addressId = this.route.snapshot.params['id'];
    this.addressesService.updateAddress(addressId, this.addressEditForm.value).subscribe(
      () => {
        this.goToAddresses();
      } 
    );
  }

  loadInitialValues() {
    const addressId = this.route.snapshot.params['id'];
    this.addressesService.getAddress(addressId).subscribe(
      (data) => {
        this.address = data;
        this.setFormValues(this.address);
      }
    )
  }

  setFormValues(address: Address) {
    this.addressEditForm.setValue({
      street: address.street,
      postalCode: address.postalCode,
      city: address.city,
      country: address.country,
    })
  }

  goToAddresses() {
    this.router.navigateByUrl('users/myprofile/addresses');
  }

}
