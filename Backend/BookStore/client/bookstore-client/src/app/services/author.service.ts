import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAuthorResponse } from '../interfaces/author/IAuthorResponse';
import { ICreateAuthorDto } from '../interfaces/author/ICreateAuthorDto';
import { IUpdateAuthorDto } from '../interfaces/author/IUpdateAuthorDto';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private baseUrl = environment.baseURL + '/api/author';

  constructor(private _http: HttpClient) {}

  public GetAllAuthors() {
    return this._http.get<IAuthorResponse[]>(this.baseUrl);
  }

  public GetAuthorById(id: number) {
    return this._http.get<IAuthorResponse>(`${this.baseUrl}/${id}`);
  }

  public CreateAuthor(author: ICreateAuthorDto) {
    return this._http.post<IAuthorResponse>(this.baseUrl, author);
  }

  public UpdateAuthor(author: IUpdateAuthorDto, id: number) {
    return this._http.put<IAuthorResponse>(`${this.baseUrl}/${id}`, author);
  }

  public DeleteAuthor(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
