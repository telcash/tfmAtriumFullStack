import { Component } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../models/category';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, confirmDialogOptions } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.css']
})
export class CategoriesTableComponent {

  displayedColumns = ['id', 'name', 'edit', 'delete'];
  categories!: Category[];

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getCategoriesList();
  }

  getCategoriesList() {
    this.categoriesService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      }
    )
  }

  deleteCategory(categoryId: number) {
    this.categoriesService.deleteCategory(categoryId).subscribe(
      () => {
        this.getCategoriesList();
      }
    );
  }

  openDeleteDialog(categoryId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar categoría',
        question: '¿Desea eliminar la categoría?',
      },
      ...confirmDialogOptions,
    })

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteCategory(categoryId);
      }
    })
  }
}
