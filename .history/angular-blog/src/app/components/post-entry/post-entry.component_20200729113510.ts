import { User } from './../../models/user.model';
import { Category } from './../../models/category.model';
import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-entry',
  templateUrl: './post-entry.component.html',
  styleUrls: ['./post-entry.component.scss']
})
export class PostEntryComponent implements OnInit {

  constructor() { }
  private currentPost: Post;
  public postCategory: Category;
  public creator: User;
  @Input('post')
  set post(value: any) {
    this.currentPost = new Post(value.id, value.user_id, value.category_id, value.title, value.content, value.image_url);
    this.creator = value.creator;
    this.postCategory = value.category;
  }
  get post() {
    return this.currentPost;
  }
  ngOnInit(): void {
    //this.currentPost = new Post(0, 0, 0, "", "", "");
  }

}
