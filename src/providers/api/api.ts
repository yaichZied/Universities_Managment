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
  get(url): Promise<any>
  {
    return this.http.get(this.api_url+url,this.getHeaders()).toPromise();
  }
  list(name): Promise<any>
  {
    return this.get('/'+name);
  }
  default(name): Promise<any>
  {
    return this.get('/'+name+'/default');
  }
  getEntity(name,id): Promise<any>
  {
    return this.get('/'+name+'/'+id);
  }

  structure(name): Promise<any>
  {
    return this.get('/'+name+'/structure');
  }
  post(url,data): Promise<any>
  {
    return this.http.post(this.api_url+url, data,this.getHeaders()).toPromise();
  }
  put(url,data): Promise<any>
  {
    return this.http.put(this.api_url+url, data,this.getHeaders()).toPromise();
  }
  add(name,entity): Promise<any>
  {
    return this.put('/'+name, entity);
  }

  update(name,id,entity): Promise<any>
  {
    return this.put('/'+name+'/'+id, entity);
  }
  delete(url): Promise<any>
  {
    return this.http.delete(this.api_url+url,this.getHeaders()).toPromise();
  }
  remove(name,id): Promise<any>
  {
    return this.delete('/'+name+'/'+id);
  }
}
