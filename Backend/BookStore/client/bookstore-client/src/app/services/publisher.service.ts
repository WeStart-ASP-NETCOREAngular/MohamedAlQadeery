import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPublisherResponse } from '../interfaces/publisher/PublisherDtos';

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  private baseUrl = environment.baseURL + '/api/publisher';

  constructor(private _http: HttpClient) {}

  public GetAllPublishers() {
    return this._http.get<IPublisherResponse[]>(this.baseUrl);
  }

  public GetPublisherById(id: number) {
    return this._http.get<IPublisherResponse>(`${this.baseUrl}/${id}`);
  }

  public DeletePublisher(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
