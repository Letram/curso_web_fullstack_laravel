import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      (params) => {
        console.log("Se cargaría el post nº" + params["id"]);
        console.log(JSON.parse(localStorage.getItem("postDetailsData")));
      }
    );
  }

}
