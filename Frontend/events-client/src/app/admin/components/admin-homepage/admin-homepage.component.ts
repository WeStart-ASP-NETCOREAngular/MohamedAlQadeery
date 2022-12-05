import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css'],
})
export class AdminHomepageComponent implements OnInit {
  constructor(
    private _accountService: AccountService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._accountService.OnLoggedout.subscribe(() => {
      this._router.navigate(['home/login']);
    });
  }
  HandleLogout() {
    this._accountService.Logout();
  }
}
