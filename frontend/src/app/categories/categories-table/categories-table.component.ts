import { Component, ViewChild } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../models/category';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, confirmDialogOptions } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatTable } from '@angular/material/table';

/**
 * Componente que gestiona una tabla con todas las categorías de productos
 */
@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.css']
})
export class CategoriesTableComponent {

  // Identificadores de las columnas de la tabla
  displayedColumns = ['id', 'name', 'edit', 'delete'];
  
  // Listado de categorías
  categories!: Category[];

  // Referencia a la tabla de la vista
  @ViewChild('table') table!: MatTable<any>;

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
  ) {}


  /**
   * Inicialización del componente
   */
  ngOnInit(): void {

    // LLamada al servicio para solicitar al API la lista de categorías
    this.categoriesService.getCategories().subscribe(

      // Inicializa el listado de categorías
      data => this.categories = data,
    )
    
  }

  /**
   * Método encargado de eliminar una categoría
   * @param {number} categoryId - Id de la categoría a eliminar
   * @param {number} tableIndex - Índice en la tabla de la vista de la categoría a eliminar 
   */
  deleteCategory(categoryId: number, tableIndex: number) {

    // LLamada al servicio para solicitar al API la eliminación de la categoría
    this.categoriesService.deleteCategory(categoryId).subscribe(
      () => {

        // Elimina la categoría del listado de la tabla
        this.categories.splice(tableIndex, 1);

        // Solicitud de renderizado a la tabla
        this.table.renderRows();
      }
    )
  }

  /**
   * Abre un diálogo de confirmación para eliminar una categoría
   * @param {number} categoryId - Id de la categoría a eliminar
   * @param {number} tableIndex - Índice en la tabla de la vista de la categoría a eliminar 
   */
  openDeleteDialog(categoryId: number, tableIndex: number) {

     // Crea el componente que genera el diálogo
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar categoría',
        question: '¿Desea eliminar la categoría?',
      },
      ...confirmDialogOptions,
    })

    // Si el dialogo confirma la eliminación invoca al metodo deleteCategory()
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteCategory(categoryId, tableIndex);
      }
    })
  }
}
