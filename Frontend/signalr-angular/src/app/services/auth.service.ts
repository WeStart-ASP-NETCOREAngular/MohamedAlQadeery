import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private username: string = '';
  private isLoggedIn = false;

  public SetUsername(name: string) {
    this.username = name;
    this.isLoggedIn = true;
  }

  public GetUsername(): string {
    return this.username;
  }

  public isAuthenticted(): boolean {
    return this.isLoggedIn;
  }
}
