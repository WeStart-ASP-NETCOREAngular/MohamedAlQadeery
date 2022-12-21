import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivateChild, CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this._authService.isAuthenticated()) {
      return true;
    }
    this._router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
    this._toastr.error('الرجاء سجل دخولك لكي تصل للصفحة', 'خطأ في الوصول', {
      positionClass: 'toast-top-center',
    });

    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._authService.isAuthenticated()) {
      return true;
    }
    this._router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });

    return false;
  }
}
