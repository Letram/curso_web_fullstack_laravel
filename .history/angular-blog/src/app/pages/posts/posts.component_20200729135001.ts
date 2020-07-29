import { Component, OnInit, HostListener } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private _postService: PostService) { }

  public posts: Post[] = [];
  public currentPage: number = 1;
  public totalPages: number = -1;
  public totalPosts: number = 0;
  ngOnInit(): void {
    this.getPosts();
  }

  /**
   * getPosts gets posts from the server (paginated, we have to call the server for more)
   */
  public getPosts() {
    this._postService.getAll(this.currentPage).subscribe(
      (response) => {
        console.log(response);
        this.totalPages = response.posts.last_page;
        this.totalPosts = response.posts.total;
        
        if(this.currentPage <= this.totalPages){
          this.posts = this.posts.concat(response.posts.data);
          this.currentPage++;
        }
      },
      error => console.error(error)
    );
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      this.getPosts();
    }
  }

  /**
   * onRemoveClicked
   */
  public onRemoveClicked(postId: number) {
    this._postService.remove(postId).subscribe(
      (response) => {
        this.posts.splice(this.posts.map(post => post.id).indexOf(response.post.id), 1);
      },
      error => console.error(error)
    );
  }
}
