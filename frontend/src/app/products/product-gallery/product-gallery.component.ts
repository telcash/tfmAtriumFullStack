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
  
  //categories!: Category[];

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

    /* this.productsService.getCategories().pipe(
      concatMap((data) => {
        this.categories = data;
        const items = data.map(item => this.productsService.getProductsByCategory(item.id));
        return forkJoin([...items]);
      })
    ).subscribe(allItems => {
      for (const [index, category] of this.categories.entries()) {
        category.products = allItems[index];
      }
    }) */


    /* this.productsService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        for(const category of this.categories) {
          this.productsService.getProductsByCategory(category.id).subscribe(
            (data: Product[]) => {
              category.products = data;
            }
          )
        }
      }
    ) */
  }

}
