import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateTagDto } from '../interfaces/tag/ICreateTagDto';
import { ITagResponseDto } from '../interfaces/tag/ITagResponseDto';
import { IUpdateTagDto } from '../interfaces/tag/IUpdateTagDto';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private baseUrl = environment.baseURL + '/api/tag';

  constructor(private _http: HttpClient) {}

  public GetAllTags() {
    return this._http.get<ITagResponseDto[]>(this.baseUrl);
  }

  public GetTagById(id: number) {
    return this._http.get<ITagResponseDto>(`${this.baseUrl}/${id}`);
  }

  public CreateTag(Tag: ICreateTagDto) {
    return this._http.post<ITagResponseDto>(this.baseUrl, Tag);
  }

  public UpdateTag(Tag: IUpdateTagDto, id: number) {
    return this._http.put<ITagResponseDto>(`${this.baseUrl}/${id}`, Tag);
  }

  public DeleteTag(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
