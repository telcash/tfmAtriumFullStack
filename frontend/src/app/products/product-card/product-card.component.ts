import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { FormControl } from '@angular/forms';
import { CartsService } from 'src/app/carts/carts.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  imgUrl: string = 'http://localhost:3000/img/products'
  @Input() product?: Product;

  quantity = new FormControl(1);
  maxItems?: number;

  constructor(private cartsService: CartsService, private cookieService: CookieService) {
  }
  
  ngOnInit(): void {
    this.imgUrl += `/${this.product?.image}`
    this.maxItems = this.getMaxItems();
  }

  addToCart() {
    const productId = this.product?.id ?? 0;
    const qt = this.quantity.value ?? 0;
    this.cartsService.addItemToCart(productId, qt).subscribe(
      (data: any) => {
        this.maxItems = this.getMaxItems();
        this.quantity.setValue(1);
      }
    )
  }

  getMaxItems(): number {
    const stock = this.product?.stock ?? 0;
    const itemsOnCart = this.cookieService.get(`pId_${this.product?.id}`) 
      ? parseInt(this.cookieService.get(`pId_${this.product?.id}`))
      : 0;
    console.log(this.product?.id);
    console.log(stock);
    console.log(itemsOnCart);
    return (stock - itemsOnCart);
  }

}
