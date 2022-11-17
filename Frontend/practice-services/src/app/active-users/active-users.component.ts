import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from '../_services/Users.services';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'],
})
export class ActiveUsersComponent {
  constructor(public _userService: UsersService) {}
  onSetToInactive(id: number) {
    this._userService.AddToInActiveList(id);
  }
}
