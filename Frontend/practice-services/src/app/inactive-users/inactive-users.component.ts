import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from '../_services/Users.services';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css'],
})
export class InactiveUsersComponent {
  constructor(public _userService: UsersService) {}
  onSetToInactive(id: number) {
    this._userService.AddToActiveList(id);
  }
}
