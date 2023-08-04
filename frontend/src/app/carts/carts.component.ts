import { Component, OnInit } from '@angular/core';
import { CartItem } from './models/cart-item';
import { CartsService } from './carts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {

  cartItems?: CartItem[];

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
  }
  
  itemDeleted() {
    const url = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
      this.router.navigate([`/${url}`])
    })
  }

}
