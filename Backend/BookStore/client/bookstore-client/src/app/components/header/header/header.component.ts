import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<boolean>;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this._authService.isLoggedin$;
  }

  HandleLogOut() {
    this._authService.Logout();
    this._router.navigate(['/home']);
    this._toastr.success('تم تسجيل الخروج بنجاح', 'تسجيل الخروج', {
      positionClass: 'toast-top-center',
    });
  }
}
