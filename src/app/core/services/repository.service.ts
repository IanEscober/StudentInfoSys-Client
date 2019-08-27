import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class RepositoryService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error from Client');
    } else {
      console.error('Error from Server');
    }

    return throwError(error.error);
  }

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(url, { params })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  post<T>(url: string, data: object = {}): Observable<T> {
    return this.http.post<T>(url, data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  delete(url: string, data: object = {}): Observable<{}> {
    return this.http.request('delete', url, { body: JSON.stringify(data) })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
}
