import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()

// @note - create a custom htpclient wrapper instead of httpinterceptor for scaling purposes
export class MyHttpClient {

  // @note - these values should go to a settings file
  apiUrl = 'http://localhost:8080';
  authKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6ImV4YW1wbGVfdG9rZW4ifQ.kQ4P_7brMqjO5uOeAJTuCysLbyrSsTzC7T4x0t0BhlE';
  

  constructor(private http: HttpClient) { }

  addBearer(headers : HttpHeaders) {
    
    headers.append('Authorization', 'Bearer ' + this.authKey); 
  }

  get(url: string) {   
    // @note for some reason the next lines do not work, or 
    let headers = new HttpHeaders();
    headers.set('Authorization', 'Bearer ' + this.authKey);     
    headers.append('Authorization', 'Bearer ' + this.authKey);     
    return this.http.get(this.apiUrl + url, 
      //{ headers: headers }
      { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.authKey}) }
      ).pipe(
      catchError(this.error)
    );
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}