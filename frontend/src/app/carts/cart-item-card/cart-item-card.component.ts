import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { ProductsService } from 'src/app/products/products.service';
import { Product } from 'src/app/products/models/product';
import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';
import { CartsService } from '../carts.service';

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.css']
})
export class CartItemCardComponent implements OnInit {
  
  
  @Input() cartItem!: CartItem;
  imgUrl!: string;
  maxItems?: number;
  product?: Product;
  quantity = new FormControl(1);
  
  constructor(
    private cartsService: CartsService,
    private productsService: ProductsService,
  ) {
    
  }

  ngOnInit(): void {
    this.quantity.setValue(this.cartItem.quantity)
    this.productsService.getProduct(this.cartItem.productId).subscribe(
      (data: Product) => {
        this.product = data;
        this.imgUrl = `http://localhost:3000/img/products/${this.product.image}`;
      }
    )
  }

  delete() {
    this.cartsService.deleteItem(this.cartItem.productId).subscribe();
  }



}
