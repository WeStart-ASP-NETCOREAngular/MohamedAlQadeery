import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IInfoResponse } from '../interfaces/app-user/IAppUserDtos';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseURL = environment.baseURL + '/api/auth';

  constructor(private _http: HttpClient) {}

  public GetUserInfo() {
    return this._http.get<IInfoResponse>(`${this.baseURL}/info`);
  }
}
