import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategoryResponseDto } from '../interfaces/category/ICategoryResponseDto';
import { ICreateCategoryDto } from '../interfaces/category/ICreateCategoryDto';
import { IUpdateCategoryDto } from '../interfaces/category/IUpdateCategoryDto';

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

  public CreateCategory(category: ICreateCategoryDto) {
    return this._http.post<ICategoryResponseDto>(this.baseUrl, category);
  }

  public UpdateCategory(category: IUpdateCategoryDto, id: number) {
    return this._http.put<ICategoryResponseDto>(
      `${this.baseUrl}/${id}`,
      category
    );
  }

  public DeleteCategory(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
