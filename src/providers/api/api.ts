import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  api_url=environment.site_url;
  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }
  private getHeaders():any
  {
    return {headers : {Authorization : localStorage.getItem("token")}};
  }
  get(url): Observable<any>
  {
    
    return this.http.get(this.api_url+url,this.getHeaders());
  }
  post(url,data): Observable<any>
  {
    return this.http.post(this.api_url+url, data,this.getHeaders());
  }
  put(url,data): Observable<any>
  {
    return this.http.put(this.api_url+url, data,this.getHeaders());
  }
  delete(url): Observable<any>
  {
    return this.http.delete(this.api_url+url,this.getHeaders());
  }

}
