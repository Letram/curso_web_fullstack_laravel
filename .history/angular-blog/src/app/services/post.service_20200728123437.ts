import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { global } from './global';
import { AuthService } from './auth.service';
import { Post } from '../models/post.model';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private _http: HttpClient, private _auth: AuthService) {}

  /**
   * create
   */
  public create(post: Post): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('authorization', this._auth.getToken());

    return this._http.post(`${global.url_api}/posts`, post, {
      headers: headers,
    });
  }
}
