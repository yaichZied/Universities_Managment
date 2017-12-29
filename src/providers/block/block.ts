import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { ApiProvider } from '../api/api';

@Injectable()
export class BlockProvider {
api_url = '/block';
  constructor(public http: ApiProvider) {
    console.log('Hello BlockProvider Provider');
  }
  gettBlock(){
    return this.http.get(this.api_url);
  }

}
