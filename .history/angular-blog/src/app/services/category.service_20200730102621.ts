import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { global } from './global';
import { AuthService } from './auth.service';
import { Category } from '../models/category.model';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient, private _auth: AuthService) {}

  public getCategories(page:number): Observable<any> {
    return this._http.get(`${global.url_api}/categories?page=${page}`);
  }
  public create(name: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('authorization', this._auth.getToken());

    return this._http.post(
      `${global.url_api}/categories`,
      { name },
      { headers: headers }
    );
  }
  public remove(id: number): Observable<any> {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('authorization', this._auth.getToken());
    return this._http.delete(`${global.url_api}/categories/${id}`, {
      headers: headers,
    });
  }

  public update(modifiedCategory: Category): Observable<any> {
    let headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('authorization', this._auth.getToken());
    return this._http.put(`${global.url_api}/categories/${modifiedCategory.id}`, modifiedCategory, {headers: headers})
  }

  public getPostsFromCategory(id: number): Observable<any> {
    return this._http.get(`${global.url_api}/categories/${id}/posts`);
  }
}
