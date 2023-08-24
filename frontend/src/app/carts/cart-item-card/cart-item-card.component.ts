import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { ProductsService } from 'src/app/products/products.service';
import { Product } from 'src/app/products/models/product';
import { FormControl } from '@angular/forms';
import { CartsService } from '../carts.service';
import { GlobalConstants } from 'src/app/config/global-constants';
import { concatMap, tap } from 'rxjs';

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.css']
})
export class CartItemCardComponent implements OnInit {
  
  
  @Input() cartItem!: CartItem;
  @Output() itemDeleted = new EventEmitter<CartItem>();
  @Output() itemUpdated = new EventEmitter<CartItem>();
  imgUrl!: string;
  maxItems?: number;
  product?: Product;
  quantity = new FormControl(1, {nonNullable: true});
  
  constructor(
    private cartsService: CartsService,
    private productsService: ProductsService,
  ) {
    
  }

  ngOnInit(): void {
    this.quantity.setValue(this.cartItem.quantity);

    this.productsService.getProduct(this.cartItem.productId).pipe(
      tap(
        product =>{
          this.product = product;
          this.imgUrl = `${GlobalConstants.API_STATIC_PRODUCTS_IMG}/${this.product.image}`;
        }
      ),
      concatMap(
        () => this.quantity.valueChanges,
      ),
      concatMap(
        quantity => this.cartsService.updateItem(this.product!.id, quantity).pipe(
          tap(
            () => this.itemUpdated.emit({...this.cartItem, quantity: quantity}),
          )
        )
      ),
    ).subscribe();

  }

  delete() {
    this.cartsService.deleteItem(this.cartItem.productId).subscribe(
      cartItem => this.itemDeleted.emit(cartItem),
    );
  }

}
