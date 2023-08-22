import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { CartsService } from '../carts.service';
import { Router } from '@angular/router';
import { concatMap, tap } from 'rxjs';
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
  addresses: Address[] = [];
  addressSelected!: Address | null;
  addressSelectedId?: number;
  cartValid = false;

  constructor(
    private cartsService: CartsService,
    private addressesService: AddressesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cartsService.findAllItems().pipe(
      concatMap((items) => {
        this.cartItems = items;
        return this.cartsService.findCart()
      })
    ).subscribe(
      (data) => {
        this.total = data.total;
        this.addressesService.getAddresses().subscribe(
          (data) => {
            this.addresses = data;
            this.addressSelected = this.addresses.length > 0 ? this.addresses[0] : null;
            this.selectAddress.valueChanges.pipe(tap(
              (data) => {
                const id:number = data? +data : 0;
                if(id>0) {
                  for(const address of this.addresses!) {
                    if(address.id === id){
                      this.addressSelected = address
                    }
                  }
                } else
                {
                  this.addressSelected = null;
                }
                this.cartValid = this.addressSelected !== null && this.cartItems.length > 0;
              }
            )).subscribe()
          }
        )
      }
    );
  }
  
  itemDeleted() {
    const url = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
      this.router.navigate([`/${url}`])
    })
  }

  checkout() {
    if(this.addressSelectedId) {
      this.cartsService.checkout(this.addressSelectedId).subscribe(
        (data) => {
          const clientSecret = data.clientSecret;
          localStorage.setItem('client_secret',clientSecret);
          this.router.navigateByUrl('/stripe-checkout');
        }
      );
    }
  }

  setAddressToNull() {
    this.addressSelected = null;
  }

}
