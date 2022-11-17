import { Injectable } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _counterService: CounterService) {}

  activeUsers = ['Mohammed', 'Reem'];
  inactiveUsers = ['Omran', 'Abdallah'];

  AddToInActiveList(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    this._counterService.IncrementInActive();
  }

  AddToActiveList(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this._counterService.IncrementActive();
  }
}
