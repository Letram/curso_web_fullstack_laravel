import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { global } from './global';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }

  test(){
    return "Hola desde un servicio";
  }

  public register(user: User): Observable<any>{
    let headers = new HttpHeaders().set("Content-type", "application/json");
    return this._http.post(global.url_auth+"/register", user, {headers: headers});
  }

  public login(user: User, wantsToken = null): Observable<any>{

    if(wantsToken != null)
      user.wantsToken = true;
    else user.wantsToken = null;
    let headers = new HttpHeaders().set("Content-type", "application/json");
    return this._http.post(global.url_auth+"/login", user, {headers: headers});
  }
}
