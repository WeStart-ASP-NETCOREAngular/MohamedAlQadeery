import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IInfoResponse } from '../interfaces/app-user/IAppUserDtos';
import { IBookReviewResponse } from '../interfaces/book/IBookResponse';
import { ICreateAddressDto } from '../interfaces/address/IAddressDtos';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseURL = environment.baseURL + '/api';

  constructor(private _http: HttpClient) {}

  public GetUserInfo() {
    return this._http.get<IInfoResponse>(`${this.baseURL}/auth/info`);
  }

  public GetUserReviews() {
    return this._http.get<IBookReviewResponse[]>(
      `${this.baseURL}/book/user-reviews`
    );
  }

  public AddUserAddress(addressRequest: ICreateAddressDto) {
    return this._http.post<IInfoResponse>(
      `${this.baseURL}/auth/info`,
      addressRequest
    );
  }
}
