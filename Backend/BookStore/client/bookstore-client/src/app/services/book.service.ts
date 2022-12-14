import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBookResponse } from '../interfaces/book/IBookResponse';
import { ICreateBookRequest } from '../interfaces/book/ICreateBookRequest';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = environment.baseURL + '/api';
  constructor(private _http: HttpClient) {}

  public GetMostOrderdBook() {
    return this._http.get<IBookResponse>(`${this.baseUrl}/sales/most-orderd`);
  }

  public GetMostSoldBook() {
    return this._http.get<IBookResponse>(`${this.baseUrl}/sales/most-sold`);
  }

  public GetLatestBook() {
    return this._http.get<IBookResponse>(`${this.baseUrl}/book/latest`);
  }

  public CreateBook(createBookRequest: ICreateBookRequest) {
    let data = new FormData();
    data.append('name', createBookRequest.name);
    data.append('price', '' + createBookRequest.price);
    data.append('discount', '' + createBookRequest.discount);
    data.append('ImageFile', createBookRequest.ImageFile);
    data.append('about', createBookRequest.about);
    data.append('publishYear', '' + createBookRequest.publishYear);
    data.append('pageCount', '' + createBookRequest.pageCount);
    data.append('authorId', '' + createBookRequest.authorId);

    if (createBookRequest.translatorId) {
      data.append('translatorId', '' + createBookRequest.translatorId);
    }

    data.append('publisherId', '' + createBookRequest.publisherId);
    data.append('categoryId', '' + createBookRequest.categoryId);

    console.log(createBookRequest);
    console.log('-----------------------------');
    data.forEach((key, value) => {
      console.log(key, value);
    });

    return this._http.post<IBookResponse>(this.baseUrl + '/book', data);
  }

  public GetAllBooks() {
    return this._http.get<IBookResponse[]>(this.baseUrl + '/book');
  }

  public GetBookById(id: number) {
    return this._http.get<IBookResponse>(`${this.baseUrl}/book/${id}`);
  }
}
