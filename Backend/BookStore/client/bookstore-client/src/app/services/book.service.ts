import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBookResponse } from '../interfaces/book/IBookResponse';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = environment.baseURL + '/api';
  constructor(private _http: HttpClient, private _imageService: ImageService) {}

  public GetMostOrderdBook() {
    return this._http.get<IBookResponse>(`${this.baseUrl}/sales/most-orderd`);
    // .pipe(
    //   map((res) => {
    //     this._imageService.GetImageUrl(res.image).pipe(
    //       tap((imageResponse) => {
    //         res.image = imageResponse.url!;
    //       })
    //     );
    //   })
    // );
  }

  public GetMostSoldBook() {
    return this._http.get<IBookResponse>(`${this.baseUrl}/sales/most-sold`);
  }

  public GetLatestBook() {
    return this._http.get<IBookResponse>(`${this.baseUrl}/book/latest`);
  }
}
