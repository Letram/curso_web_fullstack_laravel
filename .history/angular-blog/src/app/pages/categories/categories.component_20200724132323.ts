import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import {Category} from 'src/app/models/category.model';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: Category[] = [];

  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this._categoryService.getCategories().subscribe(
      response => {
        console.log(response);
        this.categories = response.categories;
      },
      error => console.error(error)
    );
  }

}
