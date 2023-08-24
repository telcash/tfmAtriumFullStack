import { Component, OnInit, inject } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { CartsService } from '../carts.service';
import { Router } from '@angular/router';
import { Observable, concat, concatMap, filter, map, shareReplay, tap } from 'rxjs';
import { AddressesService } from 'src/app/addresses/addresses.service';
import { Address } from 'src/app/addresses/models/address';
import { FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-carts',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private breakpointObserver = inject(BreakpointObserver);
  cartItems: CartItem[] = [];
  total?: number;
  selectAddress = new FormControl<Address | null>(null);
  addresses: Address[] = [];

  isSmall: Observable<boolean> = this.breakpointObserver.observe('(max-width: 1024px)').pipe(
    map(result => result.matches),
    shareReplay()
  );
  
  constructor(
    private cartsService: CartsService,
    private addressesService: AddressesService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    const cartObs = this.cartsService.findCart().pipe(
      tap(
        cart => {
          this.total = cart.total;
          this.selectAddress.setValue(cart.address ? cart.address : null);
          this.cartItems = cart.items;
        }
      )
    );

    const addressesObs = this.addressesService.getAddresses().pipe(
      tap(
        addresses => this.addresses = addresses,
      ),
      filter(
        addresses => addresses.length > 0 && this.selectAddress.value === null,
      ),
      map(
        addresses => {
          this.selectAddress.setValue(addresses[0]);
          return this.selectAddress.value?.id;
        } 
      ),
      concatMap(
        id => this.cartsService.updateCart({addressId:id}) 
      )
    );

    const selectAddressObs = this.selectAddress.valueChanges.pipe(
      concatMap(
        address => this.cartsService.updateCart({addressId: address?.id }),
      )
    )

    concat(cartObs, addressesObs, selectAddressObs).subscribe();
  }
  
  itemDeleted(cartItem: CartItem) {
    this.cartItems.splice(this.cartItems.findIndex(item => item.productId === cartItem.productId), 1);
    this.updateTotal();
  }

  itemUpdated(cartItem: CartItem) {
    const index = this.cartItems.findIndex(item => item.productId === cartItem.productId);
    this.cartItems[index].quantity = cartItem.quantity;
    this.updateTotal();
  }

  updateTotal() {
    let newTotal = 0;
    for(const item of this.cartItems) {
      newTotal += item.quantity * item.price
    }
    this.total = newTotal;
  }

  checkout() {
    if(this.selectAddress.value?.id) {
      this.cartsService.checkout(this.selectAddress.value.id).subscribe(
        (data) => {
          const clientSecret = data.clientSecret;
          localStorage.setItem('client_secret',clientSecret);
          this.router.navigateByUrl('/stripe-checkout');
        }
      );
    }
  }

  setSelectedAddressToNull() {
    this.selectAddress.setValue(null);
  }

}
