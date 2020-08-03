import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, private _postService: PostService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      (params) => {
        console.log("Se cargaría el post nº" + params["id"]);
        let data = localStorage.getItem("postDetailsData");
        if(data == null)
          this._postService.getPost(+params["id"]).subscribe(
            response => {
              console.log(response);
            },
            error => console.error(error)
          );
      }
    );
  }

}
