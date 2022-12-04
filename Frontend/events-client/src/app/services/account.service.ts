import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuthUser } from '../interfaces/user/IAuthUser';
import { ILoginResponseDto } from '../interfaces/user/ILoginResponseDto';
import { ILoginUserDto } from '../interfaces/user/ILoginUserDto';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = environment.baseURL + '/api/account';

  private authUserSubject = new ReplaySubject<IAuthUser | null>(1);
  public authUser$ = this.authUserSubject.asObservable();
  constructor(private http: HttpClient) {
    const currentAuthUser: IAuthUser = JSON.parse(
      localStorage.getItem('user')!
    );

    this.EmitAuthUser(currentAuthUser);
  }

  public LoginUser(loginUserDto: ILoginUserDto) {
    return this.http
      .post<ILoginResponseDto>(this.baseUrl + '/login', loginUserDto)
      .pipe(
        map((res) => {
          const user: IAuthUser = {
            username: res.username,
            role: res.role,
            token: res.token,
          };
          localStorage.setItem('user', JSON.stringify(user));
          this.EmitAuthUser(user);
          return res;
        })
      );
  }

  public EmitAuthUser(user: IAuthUser) {
    this.authUserSubject.next(user);
  }
  public Logout() {
    localStorage.removeItem('user');
    this.authUserSubject.next(null);
  }
}
