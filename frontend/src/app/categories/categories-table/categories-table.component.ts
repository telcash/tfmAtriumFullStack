import { Component } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../models/category';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDeleteDialogComponent } from '../category-delete-dialog/category-delete-dialog.component';

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
    const dialogRef = this.dialog.open(CategoryDeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteCategory(categoryId);
      }
    })
  }
}
