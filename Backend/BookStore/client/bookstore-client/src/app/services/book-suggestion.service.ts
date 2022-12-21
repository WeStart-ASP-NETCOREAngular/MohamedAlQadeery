import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  IBookSuggestionResponse,
  ICreateBookSuggestionDto,
} from '../interfaces/book-suggestions/IBookSuggestionDtos';

@Injectable({
  providedIn: 'root',
})
export class BookSuggestionService {
  private baseUrl = environment.baseURL + '/api/bookSuggestions';

  constructor(private _http: HttpClient) {}

  public GetAllMessages() {
    return this._http.get<IBookSuggestionResponse[]>(this.baseUrl);
  }

  public MarkMessageAsRead(messageId: number) {
    return this._http.put(`${this.baseUrl}/${messageId}/mark-read`, {});
  }
  public MarkMessageAsUnRead(messageId: number) {
    return this._http.put(`${this.baseUrl}/${messageId}/mark-unread`, {});
  }

  public CreateBookSuggestion(bookSuggestionRequest: ICreateBookSuggestionDto) {
    return this._http.post(this.baseUrl, bookSuggestionRequest);
  }
}
