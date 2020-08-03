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
   * getAll published posts paginated.
   *
   */
  public getAll(page: number): Observable<any> {
    let headers = new HttpHeaders().set('content-type', 'application/json');
    return this._http.get(`${global.url_api}/posts?page=${page}`, {
      headers: headers,
    });
  }

  /**
   * getPost with a specific id
   */
  public getPost(id: number): Observable<any> {
    return this._http.get(`${global.url_api}/posts/${id}`);
  }
  /**
   * create a post
   * @param post to create.
   */
  public create(post: Post): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('authorization', this._auth.getToken());

    return this._http.post(`${global.url_api}/posts`, post, {
      headers: headers,
    });
  }

  public update(modPost: { id: number; category_id: number; title: string; content: string; image_url: string; }): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('authorization', this._auth.getToken());

    return this._http.put(`${global.url_api}/posts/${modPost.id}`, modPost, {
      headers: headers,
    });
  }

  remove(postId: number): Observable<any> {
    let headers = new HttpHeaders().set('authorization', this._auth.getToken());
    return this._http.delete(`${global.url_api}/posts/${postId}`, {
      headers: headers,
    });
  }
}
