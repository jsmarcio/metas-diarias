import { MetaUpdate } from './types/metaUpdate';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Meta } from './types/meta';
import { Message } from './types/message';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  urlAPI = 'http://localhost:8080/api/v1/item/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  cadastraMeta(meta: Meta): Observable<any> {
    return this.http
      .post<Meta>(this.urlAPI + 'inserir', meta, this.httpOptions);
  }

  getListaMetas(): Observable<any> {
    return this.http.get<Meta[]>(this.urlAPI + 'listar-metas', this.httpOptions);
  }

  atualizaMeta(meta: MetaUpdate): Observable<any> {
    return this.http.put<Meta>(this.urlAPI + 'atualizar', meta, this.httpOptions);
  }


}
