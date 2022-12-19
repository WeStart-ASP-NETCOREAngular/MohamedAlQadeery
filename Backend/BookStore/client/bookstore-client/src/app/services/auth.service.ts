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
}
