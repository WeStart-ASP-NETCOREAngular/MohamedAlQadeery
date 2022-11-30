import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private username: string = '';
  private connectionId: string = '';
  private isLoggedIn = false;

  public onLoggedInEvent = new EventEmitter();

  public SetUsername(name: string) {
    this.username = name;
    this.isLoggedIn = true;
    this.onLoggedInEvent.emit();
  }

  public GetUsername(): string {
    return this.username;
  }

  public SetConnectionId(connectionId: string) {
    this.connectionId = connectionId;
  }

  public GetconnectionId(): string {
    return this.connectionId;
  }

  public isAuthenticted(): boolean {
    return this.isLoggedIn;
  }
}
