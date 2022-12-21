import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ICreateStaticPageDto,
  IStaticPageResponse,
  IUpdateStaticPageDto,
} from '../interfaces/static-pages/IStaticPagesDtos';

@Injectable({
  providedIn: 'root',
})
export class StaticPagesService {
  private baseUrl = environment.baseURL + '/api/staticpages';

  constructor(private _http: HttpClient) {}

  public GetAllStaticPages() {
    return this._http.get<IStaticPageResponse[]>(this.baseUrl);
  }

  public GetStaticPageById(id: number) {
    return this._http.get<IStaticPageResponse>(`${this.baseUrl}/${id}`);
  }

  public GetStaticPageSlug(slug: string) {
    return this._http.get<IStaticPageResponse>(`${this.baseUrl}/page/${slug}`);
  }

  public CreateStaticPage(page: ICreateStaticPageDto) {
    return this._http.post<IStaticPageResponse>(this.baseUrl, page);
  }

  public UpdateStaticPage(page: IUpdateStaticPageDto, id: number) {
    return this._http.put<IStaticPageResponse>(`${this.baseUrl}/${id}`, page);
  }

  public DeleteStaticPage(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
