import { Router, ActivatedRoute } from '@angular/router';
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
  public editing: boolean = false;
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

  private _postId: number = -1;
  private _userId: number = -1;

  constructor(
    private _postService: PostService,
    private _authService: AuthService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._categoryService.getCategories(0).subscribe(
      (response) => (this.categories = response.categories),
      (error) => console.error(error)
    );

    this._activatedRoute.params.subscribe(async (params) => {
      let data = JSON.parse(localStorage.getItem('postToEdit'));
      let post: any = {};
      if (data == null) {
        data = await this._postService.getPostAsPromise(+params.id);
        post = data.post;
      } else {
        post = data;
      }
      if (post.user_id != this._authService.getIdentifiedUser().sub)
        this._router.navigate(['/']);
      this.postCategory = post.category_id;
      this.postTitle = post.title;
      this.postContent = post.content;
      this.postImage_url = post.image_url;
      this._postId = post.id;
      this._userId = post.user_id;
      this.editing = true;
    });
  }

  public createPost() {
    let newPost = new Post(
      0,
      this._authService.getIdentifiedUser().sub,
      this.postCategory,
      this.postTitle,
      this.postContent,
      this.postImage_url
    );
    console.log(newPost);
    this._postService.create(newPost).subscribe(
      (response) => {
        console.log(response);
        this._router.navigate(['/posts']);
      },
      (error) => console.error(error)
    );
  }
  public OnImageUpload(response) {
    this.postImage_url = response.body.image_url;
  }

  public editPost() {
    let modPost = {
      id: this._postId,
      category_id: this.postCategory,
      title: this.postTitle,
      content: this.postContent,
      image_url: this.postImage_url,
    };
    console.log(modPost);
    this._postService.update(modPost).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.error(error)
    );
  }
}
