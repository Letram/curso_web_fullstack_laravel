import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private identifiedUser: any;
  private token: string;
  
  constructor(private _http: HttpClient) { }

  public login(user: User, wantsToken = null): Observable<any> {
    if (wantsToken != null) user.wantsToken = true;
    else user.wantsToken = null;
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.post(global.url_auth + '/login', user, {
      headers: headers,
    });
  }

  public logout() {
    this.token = null;
    this.identifiedUser = null;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public persistUser(responseData: { token: string; user: any }) {
    localStorage.setItem('token', responseData.token);
    localStorage.setItem('user', JSON.stringify(responseData.user));
    console.log('Datos guardados!');
  }

  public getIdentifiedUser() {
    let localStorageIdentifiedUser = JSON.parse(localStorage.getItem('user'));
    if (
      localStorageIdentifiedUser &&
      localStorageIdentifiedUser != 'undefined'
    ) {
      this.identifiedUser = localStorageIdentifiedUser;
    } else {
      this.identifiedUser = null;
    }
    return this.identifiedUser;
  }

  public getToken() {
    let localStorageToken = localStorage.getItem('token');
    if (localStorageToken && localStorageToken != 'undefined') {
      this.token = localStorageToken;
    } else {
      this.token = null;
    }
    return this.token;
  }
}
