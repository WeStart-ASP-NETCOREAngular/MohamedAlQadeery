import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private username: string;

  public SetUsername(name: string) {
    this.username = name;
  }

  public GetUsername(): string {
    return this.username;
  }
}
