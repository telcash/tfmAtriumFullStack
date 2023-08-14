import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  displayedColumns = ['id', 'name', 'description', 'price', 'stock', 'availability', 'image', 'edit', 'delete'];
  products!: Product[];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.getproductList();
  }

  deleteProduct(productId: number) {
    this.productsService.deleteProduct(productId).subscribe(() => {
      this.getproductList();
    });
  }

  getproductList() {
    this.productsService.getAllProducts().subscribe((
      data  => {
        this.products = data;
      }
    ))
  }
}
