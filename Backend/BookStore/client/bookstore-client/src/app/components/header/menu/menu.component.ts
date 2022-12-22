import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, AfterViewChecked {
  constructor(private _authService: AuthService) {}

  isAdmin = false;
  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    if (this._authService.isUserAdmin()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
