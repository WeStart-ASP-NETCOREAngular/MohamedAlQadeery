import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthUser } from '../interfaces/user/IAuthUser';
import { AccountService } from '../services/account.service';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  currentAuthUser: IAuthUser | null;
  constructor(private _accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this._accountService.authUser$.subscribe((user) => {
      this.currentAuthUser = user;
    });

    if (this.currentAuthUser != null) {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.currentAuthUser.token}`,
        }),
      });
    }

    return next.handle(request);
  }
}
