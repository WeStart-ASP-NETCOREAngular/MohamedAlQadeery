import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISalesResponse } from '../interfaces/sales/ISalesDtos';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private baseUrl = environment.baseURL + '/api/sales';

  constructor(private _http: HttpClient) {}

  public GetAllSales() {
    return this._http.get<ISalesResponse[]>(this.baseUrl);
  }
}
