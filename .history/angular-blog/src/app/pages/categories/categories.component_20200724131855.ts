import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this._categoryService.getCategories().subscribe(
      response => {
        console.log(response);
      },
      error => console.error(error)
    );
  }

}
