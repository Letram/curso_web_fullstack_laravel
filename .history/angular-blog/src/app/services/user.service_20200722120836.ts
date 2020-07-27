import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { global } from './global';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private identifiedUser: any;
  private token: string;

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

  public persistUser(responseData: { token: string; user: any; }) {
    localStorage.setItem("token", responseData.token);
    localStorage.setItem("user", JSON.stringify(responseData.user));
    console.log("Datos guardados!");
  }

  public getIdentifiedUser(){
    let localStorageIdentifiedUser = JSON.parse(localStorage.getItem("user"));
    if(localStorageIdentifiedUser && localStorageIdentifiedUser != "undefined"){
      this.identifiedUser = localStorageIdentifiedUser;
    }
    return this.identifiedUser;
  }

  public getToken(){
    let localStorageToken = JSON.parse(localStorage.getItem("token"));
    if(localStorageToken && localStorageToken != "undefined"){
      this.token = localStorageToken;
    }
    return this.token;
  }
}
