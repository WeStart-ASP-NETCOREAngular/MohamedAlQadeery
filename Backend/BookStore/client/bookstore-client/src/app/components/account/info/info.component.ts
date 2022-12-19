import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IInfoResponse } from 'src/app/interfaces/app-user/IAppUserDtos';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  constructor(private _accountService: AccountService) {}
  info$: Observable<IInfoResponse>;
  ngOnInit(): void {
    this.info$ = this._accountService.GetUserInfo();
  }
}
