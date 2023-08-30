import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../models/product';
import { FormControl } from '@angular/forms';
import { CartsService } from 'src/app/carts/carts.service';
import { GlobalConstants } from 'src/app/config/global-constants';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  imgUrl: string = GlobalConstants.API_STATIC_PRODUCTS_IMG;
  @Input() product!: Product;
  @Output() cartItemQuantityChange = new EventEmitter<Product>();

  quantity = new FormControl<number>(1, {nonNullable: true});
  maxItems: number = 0;
  cartItemQuantity = 0;

  constructor(private cartsService: CartsService) {
  }
  
  ngOnInit(): void {
    this.imgUrl += `/${this.product?.image}`;
    if (this.product.cartsItem && this.product.cartsItem.length >0) {
      this.cartItemQuantity = this.product.cartsItem[0].quantity
    }
    this.maxItems = this.product.stock - this.cartItemQuantity;
  }

  addToCart() {
  this.cartsService.addItemToCart(this.product.id, this.quantity.value).subscribe(
      cartItem => {
        this.product.cartsItem = [cartItem]
        this.maxItems = this.product.stock - cartItem.quantity;
        this.quantity.setValue(1);
        this.cartItemQuantityChange.emit(this.product);
      }
    )
  }

}
