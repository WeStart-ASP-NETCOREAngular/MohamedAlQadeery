import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginResponseDto } from '../interfaces/user/ILoginResponseDto';
import { ILoginUserDto } from '../interfaces/user/ILoginUserDto';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.baseURL + '/api/account';

  public LoginUser(loginUserDto: ILoginUserDto) {
    return this.http
      .post<ILoginResponseDto>(this.baseUrl + '/login', loginUserDto)
      .pipe(
        map((res) => {
          if (res.token != '') {
            localStorage.setItem('userData', JSON.stringify(res));
          }
          return res;
        })
      );
  }
}
