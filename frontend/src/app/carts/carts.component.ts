import { Component, OnInit } from '@angular/core';
import { CartItem } from './models/cart-item';
import { CartsService } from './carts.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {

  cartItems!: CartItem[];

  constructor(private cartsService: CartsService) {}

  ngOnInit(): void {
    this.cartsService.findAllItems().subscribe(
      (data: CartItem[]) => {
        this.cartItems = data;
      }
    )
  }
  
}
