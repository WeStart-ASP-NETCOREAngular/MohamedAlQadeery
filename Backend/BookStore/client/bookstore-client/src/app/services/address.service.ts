import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  IAddressResponse,
  ICreateAddressDto,
  IUpdateAddressDto,
} from '../interfaces/address/IAddressDtos';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private baseUrl = environment.baseURL + '/api/address';

  constructor(private _http: HttpClient) {}

  public GetAllAddresses() {
    return this._http.get<IAddressResponse[]>(this.baseUrl);
  }

  public GetAddressById(id: number) {
    return this._http.get<IAddressResponse>(`${this.baseUrl}/${id}`);
  }

  public CreateAddress(address: ICreateAddressDto) {
    return this._http.post<IAddressResponse>(this.baseUrl, address);
  }

  public UpdateAddress(address: IUpdateAddressDto, id: number) {
    return this._http.put<IAddressResponse>(`${this.baseUrl}/${id}`, address);
  }

  public DeleteAddress(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
