import { Router } from '@angular/router';
import { Post } from './../../models/post.model';
import { AuthService } from './../../services/auth.service';
import { PostService } from './../../services/post.service';
import { global } from './../../services/global';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  public postTitle: string = '';
  public postContent: string = '';
  public postCategory: number = 0;
  public postImage_url: string = '';

  public resetVar: any;

  public categories: Category[];

  //angular file uploader config
  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png,.jpeg',
    maxSize: '2',
    uploadAPI: {
      url: `${global.url_api}/posts/upload`,
      method: 'POST',
      headers: {
        Authorization: `${this._authService.getToken()}`,
      },
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: true,
    replaceTexts: {
      attachPinBtn: 'Upload you avatar.',
    },
  };

  constructor(
    private _postService: PostService,
    private _authService: AuthService,
    private _categoryService: CategoryService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._categoryService.getCategories(0).subscribe(
      (response) => (this.categories = response.categories),
      (error) => console.error(error)
    );
  }

  public createPost() {
    let newPost = new Post(0, this._authService.getIdentifiedUser().sub, this.postCategory, this.postTitle, this.postContent, this.postImage_url);
    console.log(newPost);
    this._postService.create(newPost).subscribe(
      response => {
        console.log(response);
        this._router.navigate(["/posts"]);
      },
      error => console.error(error)
    );
  }
  public OnImageUpload(response) {
    this.postImage_url = response.body.image_url;
  }
}
