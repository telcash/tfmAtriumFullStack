import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../models/product';
import { concatMap, forkJoin } from 'rxjs';

export interface CategoryTab {
  label: string;
  content: Product[];
}

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.css']
})

export class ProductGalleryComponent implements OnInit {

  tabs: CategoryTab[] = [];
  labels: string[] = [];

  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {

    this.productsService.getCategories().pipe(
      concatMap((categories) => {
        categories.map(category => this.labels.push(category.name));
        const products = categories.map(category => this.productsService.getProductsByCategory(category.id));
        return forkJoin([...products]);
      })
    ).subscribe(allProducts => {
      for (const [index, productsByCategory] of allProducts.entries()) {
        const tab: CategoryTab = {
          label: this.labels[index],
          content: productsByCategory,
        }
        this.tabs.push(tab);
      }
    })

  }

}
