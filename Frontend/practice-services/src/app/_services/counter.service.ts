import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  constructor() {}
  activeCounter: number = 0;
  inActiveCounter: number = 0;

  IncrementActive() {
    this.activeCounter++;
    console.log(`Active user : ${this.activeCounter}`);
  }

  IncrementInActive() {
    this.inActiveCounter++;
    console.log(`inActive user : ${this.inActiveCounter}`);
  }
}
