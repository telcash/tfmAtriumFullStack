import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { CartsService } from '../carts.service';
import { Router } from '@angular/router';
import { concat, concatMap, filter, map, tap } from 'rxjs';
import { AddressesService } from 'src/app/addresses/addresses.service';
import { Address } from 'src/app/addresses/models/address';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-carts',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  total?: number;
  selectAddress = new FormControl('');
  sdasd = new FormControl<Address | null>(null);
  addresses: Address[] = [];
  selectedAddress!: Address | null;
  selectedAddressId?: number;
  cartValid = false;

  constructor(
    private cartsService: CartsService,
    private addressesService: AddressesService,
    private router: Router,
  ) {}

  test() {
    console.log(typeof this.selectAddress.value)
    console.log(this.selectAddress.value);
  }

  ngOnInit(): void {

    const cartObs = this.cartsService.findCart().pipe(
      tap(
        cart => {
          this.total = cart.total;
          this.selectedAddress = cart.address ? cart.address : null;
          this.cartItems = cart.items;
        }
      )
    );
    const addressesObs = this.addressesService.getAddresses().pipe(
      tap(
        addresses => this.addresses = addresses,
      ),
      filter(
        addresses => addresses.length > 0 && !this.selectedAddress,
      ),
      map(
        addresses => {
          this.selectedAddress = addresses[0];
          return this.selectedAddress.id;
        } 
      ),
      concatMap(
        (id) => this.cartsService.updateCart({addressId:id } ) 
      )
    );

    const selectAddressObs = this.selectAddress.valueChanges.pipe(
      map(
       id => id === null ? 0 : +id,
      ),
      filter(
        id => id > 0
      ),
      map(
        id => this.addresses.filter((address) => address.id === id )[0],
      ),
      tap(
        address => this.selectedAddress = address,
      ),
      concatMap(
        address => this.cartsService.updateCart( {addressId: address.id } )
      )
    )

    concat(cartObs, addressesObs, selectAddressObs).subscribe(
      () => this.cartValid = this.selectedAddress !== null && this.cartItems.length > 0,
    )
  }
  
  itemDeleted() {
    const url = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
      this.router.navigate([`/${url}`])
    })
  }

  checkout() {
    if(this.selectedAddressId) {
      this.cartsService.checkout(this.selectedAddressId).subscribe(
        (data) => {
          const clientSecret = data.clientSecret;
          localStorage.setItem('client_secret',clientSecret);
          this.router.navigateByUrl('/stripe-checkout');
        }
      );
    }
  }

  setSelectedAddressToNull() {
    this.selectedAddress = null;
  }

}
