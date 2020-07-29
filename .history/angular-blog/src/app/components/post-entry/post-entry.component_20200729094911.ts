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
  @Input('post')
  set post(value: Post) {
    console.log(value);
    this.currentPost = value;
  }
  get post() {
    return this.currentPost;
  }
  ngOnInit(): void {
    this.currentPost = new Post(0, 0, 0, "", "", "");
  }

}
