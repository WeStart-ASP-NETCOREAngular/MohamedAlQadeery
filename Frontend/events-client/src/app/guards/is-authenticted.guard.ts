import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root',
})
export class IsAuthentictedGuard implements CanActivate {
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
        if (user) return true;
        else {
          return this._router.parseUrl('/home/login');
        }
      })
    );
  }
}
