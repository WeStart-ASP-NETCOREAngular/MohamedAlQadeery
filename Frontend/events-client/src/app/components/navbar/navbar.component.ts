import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  subrciption = new Subscription();
  constructor(
    public accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.subrciption = this.accountService.OnLoggedout.subscribe(() => {
      this.toastr.info('Logged out successfully', 'Logout success', {
        positionClass: 'toast-bottom-right',
      });
    });
  }

  ngOnDestroy(): void {
    this.subrciption.unsubscribe();
  }

  OnClickLogout() {
    this.accountService.Logout();
  }
}
