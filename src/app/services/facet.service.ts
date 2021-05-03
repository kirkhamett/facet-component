import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MyHttpClient } from './my-http-client.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacetService {
  
  constructor(private myHttp: MyHttpClient) { }

  getAll(): Observable<any> {
    return this.myHttp.get('/facet');
  }
  
}
