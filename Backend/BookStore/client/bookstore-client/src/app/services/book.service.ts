import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookParams } from '../helpers/bookParams';
import { IBookResponse } from '../interfaces/book/IBookResponse';
import { ICreateBookRequest } from '../interfaces/book/ICreateBookRequest';
import { IUpdateBookRequest } from '../interfaces/book/IUpdateBookRequest';
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
    data.append('publisherId', '' + createBookRequest.publisherId);
    data.append('categoryId', '' + createBookRequest.categoryId);
    if (createBookRequest.translatorId) {
      data.append('translatorId', '' + createBookRequest.translatorId);
    }

    return this._http.post<IBookResponse>(this.baseUrl + '/book', data);
  }

  public GetAllBooks(bookParams?: BookParams) {
    let params = new HttpParams();
    if (bookParams?.takeCount) {
      params = params.append('takeCount', bookParams.takeCount);
    }
    if (bookParams?.bookName) {
      params = params.append('bookName', bookParams.bookName);
    }
    if (bookParams?.authorName) {
      params = params.append('authorName', bookParams.authorName);
    }
    if (bookParams?.year) {
      params = params.append('year', bookParams.year);
    }

    return this._http.get<IBookResponse[]>(this.baseUrl + '/book', {
      params: params,
    });
  }

  public GetBookById(id: number) {
    return this._http.get<IBookResponse>(`${this.baseUrl}/book/${id}`);
  }

  public UpdateBook(id: number, updateBookRequest: IUpdateBookRequest) {
    let data = new FormData();
    data.append('name', updateBookRequest.name);
    data.append('price', '' + updateBookRequest.price);
    data.append('discount', '' + updateBookRequest.discount);
    data.append('about', updateBookRequest.about);
    data.append('publishYear', '' + updateBookRequest.publishYear);
    data.append('pageCount', '' + updateBookRequest.pageCount);
    data.append('authorId', '' + updateBookRequest.authorId);
    data.append('publisherId', '' + updateBookRequest.publisherId);
    data.append('categoryId', '' + updateBookRequest.categoryId);
    if (updateBookRequest.translatorId) {
      data.append('translatorId', '' + updateBookRequest.translatorId);
    }
    if (updateBookRequest.ImageFile) {
      data.append('ImageFile', updateBookRequest.ImageFile);
    }

    return this._http.put<IBookResponse>(`${this.baseUrl}/book/${id}`, data);
  }

  public DeleteBook(id: number) {
    return this._http.delete(`${this.baseUrl}/book/${id}`);
  }
}
