import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root',
})
export class IsGuestGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.accountService.authUser$.pipe(
      map((user) => {
        if (user === null) return true;
        else {
          return this._router.parseUrl('home');
        }
      })
    );
  }
}
