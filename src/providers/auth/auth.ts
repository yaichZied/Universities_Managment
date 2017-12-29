import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from '../api/api';
@Injectable()
export class AuthProvider {
api_url=environment.site_url+environment.jwt_url;
  constructor(public http: HttpClient,public api : ApiProvider) {
    console.log('Hello AuthProvider Provider');
  }
  login(username, password): Observable<any>
  {
    const body = new FormData();
    body.append('username', username);
    body.append('password', password);
    let obs =  this.http.post(this.api_url, body);
    obs.subscribe(data => {
      localStorage.setItem("token", data["token"]);
      localStorage.setItem("user",data["user"]);
      
    })
    return obs;
  }

  logout() : void {
    localStorage.clear();
  }

  token() : string {
    return localStorage.getItem("token");
  }
  me() : Observable<any> {
    let obs =  this.api.get('/me');
    obs.toPromise().catch(error => {localStorage.clear()})
    return obs;
  }
}
