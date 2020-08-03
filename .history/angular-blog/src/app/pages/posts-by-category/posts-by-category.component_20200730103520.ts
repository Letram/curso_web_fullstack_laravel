import { Post } from 'src/app/models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-posts-by-category',
  templateUrl: './posts-by-category.component.html',
  styleUrls: ['./posts-by-category.component.scss']
})
export class PostsByCategoryComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _categoryService:CategoryService) { }

  public posts: Post[] = [];

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      params => {
        this._categoryService.getPostsFromCategory(params.id).subscribe(
          response => {
            console.log(response);
            this.posts = response;
          },
          error => console.error(error)
        );
      }
    );
  }

}
