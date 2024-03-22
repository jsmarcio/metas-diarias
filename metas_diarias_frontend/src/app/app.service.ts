import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Meta } from './types/meta';
import { Message } from './types/message';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  urlAPI = 'localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  cadastraMeta(meta: Meta): Observable<any> {
    return this.http
      .post<Meta>(this.urlAPI, meta, this.httpOptions)
      .pipe(catchError(this.handleError('cadastraMeta', meta)));
  }

  handleError(
    arg0: string,
    meta: Meta
  ): (
    err: any,
    caught: Observable<Meta>
  ) => import('rxjs').ObservableInput<any> {
    throw new Error('Method not implemented.');
  }
}
