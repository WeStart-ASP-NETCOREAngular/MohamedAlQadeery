import { Component, OnInit } from '@angular/core';
import { IAuthUser } from './interfaces/user/IAuthUser';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'events-client';

  constructor(private accountService: AccountService) {}
  ngOnInit(): void {
    this.SetCurrentAuthUser();
  }

  private SetCurrentAuthUser() {
    const currentAuthUser: IAuthUser = JSON.parse(
      localStorage.getItem('user')!
    );
    console.log(currentAuthUser);

    this.accountService.SetAuthUser(currentAuthUser);
  }
}
