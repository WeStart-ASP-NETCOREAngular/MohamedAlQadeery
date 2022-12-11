import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IBookResponse } from '../interfaces/book/IBookResponse';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = environment.baseURL + '/api/';
  constructor(private _http: HttpClient) {}

  public GetMostOrderdBook() {
    return this._http.get<IBookResponse>(`${this.baseUrl}/sales/most-orderd`);
  }

  public GetMostSoldBook() {
    return this._http.get<IBookResponse>(`${this.baseUrl}/sales/most-sold`);
  }

  public GetLatestBook() {
    return this._http.get<IBookResponse>(`${this.baseUrl}/book/latest`);
  }
}
