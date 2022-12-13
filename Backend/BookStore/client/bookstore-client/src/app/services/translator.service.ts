import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ICreateTranslatorDto,
  ITranslatorResponse,
  IUpdateTranslatorDto,
} from '../interfaces/translator/TranslatorDtos';

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  private baseUrl = environment.baseURL + '/api/translator';

  constructor(private _http: HttpClient) {}

  public GetAllTranslators() {
    return this._http.get<ITranslatorResponse[]>(this.baseUrl);
  }

  public GetTranslatorById(id: number) {
    return this._http.get<ITranslatorResponse>(`${this.baseUrl}/${id}`);
  }

  public CreateTranslator(translator: ICreateTranslatorDto) {
    return this._http.post<ITranslatorResponse>(this.baseUrl, translator);
  }

  public UpdateTranslator(translator: IUpdateTranslatorDto, id: number) {
    return this._http.put<ITranslatorResponse>(
      `${this.baseUrl}/${id}`,
      translator
    );
  }

  public DeleteTranslator(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
