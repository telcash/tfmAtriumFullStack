import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { CartsService } from '../carts.service';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-carts',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems?: CartItem[];
  total?: number;

  constructor(
    private cartsService: CartsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cartsService.findAllItems().subscribe(
      (data: CartItem[]) => {
        this.cartItems = data;
      }
    )
    this.cartsService.findCart().subscribe(
      (data: Cart) => {
        this.total = data.total;
      }
    )
  }
  
  itemDeleted() {
    const url = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
      this.router.navigate([`/${url}`])
    })
  }

}
