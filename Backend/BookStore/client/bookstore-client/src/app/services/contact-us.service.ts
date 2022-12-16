import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IContactusResponse } from '../interfaces/contact-us/IContactusDtos';
import { ISalesResponse } from '../interfaces/sales/ISalesDtos';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private baseUrl = environment.baseURL + '/api/contactus';

  constructor(private _http: HttpClient) {}

  public GetAllMessages() {
    return this._http.get<IContactusResponse[]>(this.baseUrl);
  }

  public MarkMessageAsRead(messageId: number) {
    return this._http.put(`${this.baseUrl}/${messageId}/mark-read`, {});
  }

  public MarkMessageAsUnRead(messageId: number) {
    return this._http.put(`${this.baseUrl}/${messageId}/mark-unread`, {});
  }
}
