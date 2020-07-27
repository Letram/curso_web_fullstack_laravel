import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { global } from './global';
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(
    private _http: HttpClient
  ) { }

    public getCategories(): Observable<any>{
      return this._http.get(`${global.url_api}/categories`);
    }

}
