import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategoryResponseDto } from '../interfaces/category/ICategoryResponseDto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = environment.baseURL + '/api/category';

  constructor(private _http: HttpClient) {}

  public GetAllCategories() {
    return this._http.get<ICategoryResponseDto[]>(this.baseUrl);
  }

  public GetCategoryById(id: number) {
    return this._http.get<ICategoryResponseDto>(`${this.baseUrl}/${id}`);
  }
}
