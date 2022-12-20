import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../interfaces/authentication/AuthenticationDtos';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = environment.baseURL + '/api/auth';
  private isLoggedInSubject = new BehaviorSubject(false);
  public isLoggedin$ = this.isLoggedInSubject.asObservable();
  constructor(private httpClient: HttpClient) {
    if (this.isAuthenticated()) {
      this.isLoggedInSubject.next(true);
    }
  }

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

    this.isLoggedInSubject.next(true);
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const expiration = localStorage.getItem('token-expiration')!;
    const expirationDate = new Date(expiration);

    if (expirationDate <= new Date()) {
      this.Logout();
      return false;
    }

    return true;
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('token-expiration');
    this.isLoggedInSubject.next(false);
  }

  GetFieldFromJWT(field: string) {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  GetToken() {
    return localStorage.getItem('token');
  }

  isUserAdmin() {
    const role = this.GetFieldFromJWT(
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    );

    return role === 'admin';
  }
}
