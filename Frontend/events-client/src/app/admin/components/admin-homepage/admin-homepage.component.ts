import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css'],
})
export class AdminHomepageComponent implements OnInit, OnDestroy {
  subrciption = new Subscription();

  constructor(
    private _accountService: AccountService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.subrciption = this._accountService.OnLoggedout.subscribe(() => {
      this._toastr.info('Logged out successfully', 'Logout success', {
        positionClass: 'toast-bottom-right',
      });
      this._router.navigate(['home/login']);
    });
  }

  ngOnDestroy(): void {
    this.subrciption.unsubscribe();
  }
  HandleLogout() {
    this._accountService.Logout();
  }
}
