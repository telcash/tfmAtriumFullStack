import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../products.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/config/global-constants';
import { ConfirmDialogComponent, confirmDialogOptions } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatTable } from '@angular/material/table';

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

  // Referencia a la tabla de la vista
  @ViewChild('table') table!: MatTable<any>;

  imgUrl: string = GlobalConstants.API_STATIC_PRODUCTS_IMG;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
  ) {}

  /**
   * Inicialización del componente
   */
  ngOnInit() {
    // LLamada al servicio para la solicitud al API del listado de productos
    this.productsService.getAllProducts().subscribe((
      (data)  => {

        // Actualiza el listado de productos
        this.products = data;
      }
    ))
  }

  /**
   * Método que elimina un producto
   * @param {number} productId - Id del producto
   * @param {number} tableIndex - Índice en la tabla de la vista del producto a a eliminar
   */
  deleteProduct(productId: number, tableIndex: number) {
    
    // Llamada al servicio para solicitud al API de la eliminación del producto
    this.productsService.deleteProduct(productId).subscribe(() => {
      
      // Elimina el producto del listado de la tabla
      this.products.splice(tableIndex, 1);

      // Solicitud de renderizado a la tabla
      this.table.renderRows();
    });
  }

  /**
   * Metodo que abre un dialogo de confirmación de eliminación de un producto
   * @param {number} productId - Id del producto
   * @param {number} tableIndex - Índice en la tabla de la vista del producto a a eliminar
   */
  openDeleteDialog(productId: number, tableIndex: number) {

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
        this.deleteProduct(productId, tableIndex);
      }
    })
  }
}
