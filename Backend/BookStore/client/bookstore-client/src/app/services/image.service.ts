import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl = environment.baseURL + '/api/images';

  constructor(private _http: HttpClient) {}

  public GetImageUrl(fileName: string) {
    return this._http.get(`${this.baseUrl}/${fileName}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}
