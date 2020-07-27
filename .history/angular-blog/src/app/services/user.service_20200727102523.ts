import { AuthService } from './auth.service';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { global } from './global';
import { ɵBrowserPlatformLocation } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient, private _auth: AuthService) {}

  public getUser(id: number): Observable<any> {
    let headers = new HttpHeaders().set("Content-type", "Application/json");
    return this._http.get(global.url_api + "/users/" + id, {headers: headers});
  }

  public update(user: {
    id: any;
    name: string;
    email: string;
    description: string;
  }): Observable<any> {
    let identifiedUser = this._auth.getIdentifiedUser();
    let token = this._auth.getToken();
    console.log({ user, id: identifiedUser.sub, token: token });
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', token);
    return this._http.put(
      global.url_api + '/users/' + identifiedUser.sub,
      user,
      {
        headers: headers,
      }
    );
  }

  public register(user: User): Observable<any> {
    return this._auth.register(user);
  }

  public login(user: User, wantsToken = null): Observable<any> {
    return this._auth.login(user, wantsToken);
  }

  public logout() {
    this._auth.logout();
  }

  public persistUser(responseData: { token: string; user: any }) {
    localStorage.setItem('token', responseData.token);
    localStorage.setItem('user', JSON.stringify(responseData.user));
    console.log('Datos guardados!');
  }

  public getIdentifiedUser() {
    return this._auth.getIdentifiedUser();
  }

  public getToken() {
    return this._auth.getToken();
  }
}
