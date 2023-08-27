import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../products.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/config/global-constants';
import { ConfirmDialogComponent, confirmDialogOptions } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  displayedColumns = ['id', 'name', 'description', 'price', 'stock', 'availability', 'categories', 'image', 'edit', 'delete'];
  products!: Product[];
  imgUrl: string = GlobalConstants.API_STATIC_PRODUCTS_IMG;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getProductsList();
  }

  deleteProduct(productId: number) {
    this.productsService.deleteProduct(productId).subscribe(() => {
      this.getProductsList();
    });
  }

  getProductsList() {
    this.productsService.getAllProducts().subscribe((
      (data)  => {
        this.products = data;
      }
    ))
  }

  openDeleteDialog(productId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar producto',
        question: '¿Desea eliminar el producto?',
      },
      ...confirmDialogOptions,
    })

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteProduct(productId);
      }
    })
  }
}
