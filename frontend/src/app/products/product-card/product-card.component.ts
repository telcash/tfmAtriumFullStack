import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  imgUrl: string = 'http://localhost:3000/img/products'
  @Input() product?: Product;

  constructor() {
  }
  
  ngOnInit(): void {
    this.imgUrl += `/${this.product?.image}`
  }

}
