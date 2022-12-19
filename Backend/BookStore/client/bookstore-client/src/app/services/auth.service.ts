import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../interfaces/authentication/AuthenticationDtos';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = environment.baseURL + '/api/auth';
  constructor(private httpClient: HttpClient) {}

  LoginWithEmail(userForAuth: LoginRequest) {
    return this.httpClient.post<AuthResponse>(
      this.baseURL + '/login',
      userForAuth
    );
  }

  RegisterWithEmail(userForRegister: RegisterRequest) {
    return this.httpClient.post<AuthResponse>(
      this.baseURL + '/register',
      userForRegister
    );
  }

  SaveToken(authResponse: AuthResponse) {
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem(
      'token-expiration',
      authResponse.expiration.toString()
    );
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const expiration = localStorage.getItem('token-expiration')!;
    const expirationDate = new Date(expiration);

    if (expirationDate <= new Date()) {
      this.logout();
      return false;
    }

    return true;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('token-expiration');
  }
}
