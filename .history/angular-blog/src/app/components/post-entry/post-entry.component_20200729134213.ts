import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { User } from './../../models/user.model';
import { Category } from './../../models/category.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-entry',
  templateUrl: './post-entry.component.html',
  styleUrls: ['./post-entry.component.scss'],
})
export class PostEntryComponent implements OnInit {
  constructor(private _router: Router, private _auth: AuthService) {}
  private currentPost: Post;
  public postCategory: Category;
  public creator: User;
  public currentUser:any;
  @Input('post')
  set post(value: any) {
    this.currentPost = new Post(
      value.id,
      value.user_id,
      value.category_id,
      value.title,
      value.content,
      value.image_url
    );
    this.creator = value.user;
    this.postCategory = value.category;
  }
  get post() {
    return this.currentPost;
  }

  @Output() onRemoveClicked: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.currentUser = this._auth.getIdentifiedUser();
  }

  /**
   * navigates to a post
   */
  public showPost() {
    console.log(this.post.id);
    localStorage.setItem(
      'postDetailsData',
      JSON.stringify({
        creator: this.creator,
        category: this.postCategory,
        post: this.post,
      })
    );
    this._router.navigate(['/posts', this.post.id]);
  }

  public removePost(){
    this.onRemoveClicked.emit(this.post.id);
  }
}
