import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private _postService: PostService) { }

  public currentPage: number = 1;

  ngOnInit(): void {
    this.retrievePosts();
  }

  /**
   * retrievePosts gets posts from the server (paginated, we have to call the server for more)
   */
  public retrievePosts() {
    this._postService.getAll(this.currentPage).subscribe(
      (response) => {
        console.log(response);
      },
      error => console.error(error)
    );
  }

}
