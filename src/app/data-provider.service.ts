import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  endpoint = 'http://localhost:8000';

  getEvents(): Observable<any> {
    return this.http.get(`${this.endpoint}/events/all`);
  }

  constructor(public http: HttpClient) { }
}
