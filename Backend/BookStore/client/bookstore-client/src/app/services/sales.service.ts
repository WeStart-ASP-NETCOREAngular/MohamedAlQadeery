import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ICreateSalesDto,
  ISalesResponse,
} from '../interfaces/sales/ISalesDtos';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private baseUrl = environment.baseURL + '/api/sales';

  constructor(private _http: HttpClient) {}

  public GetAllSales() {
    return this._http.get<ISalesResponse[]>(this.baseUrl);
  }

  public CreateSale(bookId: number, sale: ICreateSalesDto) {
    return this._http.post<ISalesResponse>(
      `${this.baseUrl}/${bookId}/add-sale`,
      sale
    );
  }

  public GetUserOrders() {
    return this._http.get<ISalesResponse[]>(`${this.baseUrl}/user-sales`);
  }

  public UpdateSaleStatus(saleId: number, status: number) {
    return this._http.put<ISalesResponse>(
      `${this.baseUrl}/${saleId}/${status}`,
      {}
    );
  }
}
