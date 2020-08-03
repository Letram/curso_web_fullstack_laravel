import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private _postService: PostService) { }

  public randomPosts: Post[] = [];

  ngOnInit(): void {
    this._postService.getRandomPosts(10).subscribe(
      response => {
        console.log(response);
        this.randomPosts = response.posts;
      },
      error => console.error(error)
    );
  }

}
