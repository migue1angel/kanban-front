import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  resource,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { isPlatformBrowser } from '@angular/common';

enum AuthStatus {
  Checking = 'checking',
  Authenticated = 'authenticated',
  NotAuthenticated = 'not-authenticated',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly platformBrowser = isPlatformBrowser(this.platformId);
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = `${environment.baseApiUrl}/auth`;

  private readonly _authStatus = signal<AuthStatus>(AuthStatus.Checking);
  private readonly _user = signal<User | null>(null);
  private readonly _token = signal<string | null>(null);
  public token = computed(() => this._token());
  public user = computed(() => this._user());
  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === AuthStatus.Checking) return AuthStatus.Checking;
    if (this._user()) return AuthStatus.Authenticated;
    return AuthStatus.NotAuthenticated;
  });

  checkStatusResource = resource({
    loader: () => firstValueFrom(this.checkAuthStatus()),
  });

  checkAuthStatus(): Observable<boolean> {
    if (!this.platformBrowser) {
      return of(false);
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    this._token.set(token);

    return this.httpClient
      .get<AuthResponse>(`${this.apiUrl}/validate-token`)
      .pipe(
        map((response) => this.handleAuthSuccess(response)),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  login(loginModel: LoginModel): Observable<boolean> {
    return this.httpClient
      .post<AuthResponse>(`${this.apiUrl}/login`, loginModel)
      .pipe(
        map((response) => this.handleAuthSuccess(response)),
        catchError((error) => this.handleAuthError(error))
      );
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._authStatus.set(AuthStatus.Authenticated);
    this._token.set(token);

    localStorage.setItem('token', token);

    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set(AuthStatus.NotAuthenticated);

    localStorage.removeItem('token');
  }
}
