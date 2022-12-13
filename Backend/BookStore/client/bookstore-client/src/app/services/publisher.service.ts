import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ICreatePublisherDto,
  IPublisherResponse,
  IUpdatePublisherDto,
} from '../interfaces/publisher/PublisherDtos';

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

  public CreatePublisher(createPublisherDto: ICreatePublisherDto) {
    let formData = new FormData();
    formData.append('Name', createPublisherDto.name);
    formData.append('LogoImage', createPublisherDto.logo);

    return this._http.post<IPublisherResponse>(this.baseUrl, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  public UpdatePublisher(
    publisherId: number,
    updatePublisherDto: IUpdatePublisherDto
  ) {
    let formData = new FormData();
    formData.append('Name', updatePublisherDto.name);
    if (updatePublisherDto.logo) {
      formData.append('LogoImage', updatePublisherDto.logo);
    }

    return this._http.put<IPublisherResponse>(
      this.baseUrl + '/' + publisherId,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }
}
