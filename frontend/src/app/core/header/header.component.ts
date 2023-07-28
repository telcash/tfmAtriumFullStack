import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  asyncTabs: Observable<ExampleTab[]>

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'Categoría1', content: 'Productos 1'},
          {label: 'Categoría2', content: 'Productos 2'},
          {label: 'Categoría3', content: 'Productos 3'},
          {label: 'Categoría4', content: 'Productos 4'},
          {label: 'Categoría5', content: 'Productos 5'},
          {label: 'Categoría6', content: 'Productos 6'},
          {label: 'Categoría7', content: 'Productos 7'},
        ]);
      }, 1000);
    });
  }

}
