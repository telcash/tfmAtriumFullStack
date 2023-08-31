import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../products.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/config/global-constants';
import { ConfirmDialogComponent, confirmDialogOptions } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

/**
 * Componente que gestiona la tabla de productos
 */
@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  
  // Identificadores de columnas de la tabla
  displayedColumns = ['id', 'name', 'description', 'price', 'stock', 'availability', 'categories', 'image', 'edit', 'delete'];
  
  // Listado de productos
  products!: Product[];

  imgUrl: string = GlobalConstants.API_STATIC_PRODUCTS_IMG;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
  ) {}

  /**
   * Inicialización del componente
   */
  ngOnInit() {
    this.getProductsList();
  }

  /**
   * Método que elimina un producto
   * @param {number} productId - Id del producto
   */
  deleteProduct(productId: number) {
    
    // Llamada al servicio para solicitud al API de la eliminación del producto
    this.productsService.deleteProduct(productId).subscribe(() => {
      this.getProductsList();
    });
  }

  /**
   * Método que carga la lista de productos
   */
  getProductsList() {

    // LLamada al servicio para la solicitud al API del listado de productos
    this.productsService.getAllProducts().subscribe((
      (data)  => {

        // Actualiza el listado de productos
        this.products = data;
      }
    ))
  }

  /**
   * Metodo que abre un dialogo de confirmación de eliminación de un producto
   * @param {number} productId - Id del producto 
   */
  openDeleteDialog(productId: number) {

    // Creación del componente que genera el diálogo
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar producto',
        question: '¿Desea eliminar el producto?',
      },
      ...confirmDialogOptions,
    })

    // Si el diálogo cierra con una confirmación invoca al método deleteProduct()
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteProduct(productId);
      }
    })
  }
}
