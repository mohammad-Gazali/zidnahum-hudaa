import { Injectable, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, catchError, tap } from 'rxjs';
import { AccountsService } from './api/services';
import { SnackbarService } from './snackbar.service';
import { Group } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accounts = inject(AccountsService);
  private snackbar = inject(SnackbarService);

  private _currentUser = signal<CurrentUser | null | undefined>(undefined);
  private _token = localStorage.getItem('zidnahum-token');
  private _refreshToken = localStorage.getItem('zidnahum-refresh-token');

  public readonly currentUser = this._currentUser.asReadonly();

  get token() {
    return this._token;
  }

  get refreshToken() {
    return this._refreshToken;
  }

  set token(newVal) {
    if (newVal === null) {
      this._token = null;
      localStorage.removeItem('zidnahum-token');
    } else {
      this._token = newVal;
      localStorage.setItem('zidnahum-token', newVal);
    }
  }

  set refreshToken(newVal) {
    if (newVal === null) {
      this._refreshToken = null;
      localStorage.removeItem('zidnahum-refresh-token');
    } else {
      this._refreshToken = newVal;
      localStorage.setItem('zidnahum-refresh-token', newVal);
    }
  }

  initialize(afterRefresh?: boolean) {
    if (this.token === null) {
      this._currentUser.set(null);
      return;
    }

    this.accounts
      .accountsDetailsList()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (
            err.status === 401 &&
            this.refreshToken !== null &&
            !afterRefresh
          ) {
            this.accounts
              .accountsTokenRefreshCreate({
                refresh: this.refreshToken,
              })
              .pipe(
                catchError(() => {
                  this.token = null;
                  this.refreshToken = null;

                  return EMPTY;
                })
              )
              .subscribe((res) => {
                this.token = res.access!;
                this.refreshToken = res.refresh;

                this.initialize(true);
              });
          }

          return EMPTY;
        })
      )
      .subscribe((res) => {
        this._currentUser.set({
          id: res.id!,
          username: res.username,
          firstName: res.first_name ?? '',
          lastName: res.last_name ?? '',
          isAdmin: Boolean(res.is_superuser || res.is_staff),
          groups: res.groups ?? [],
        });
      });
  }

  login(body: { username: string; password: string }) {
    return this.accounts
      .accountsTokenCreate(body)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.snackbar.error('لا يوجد حساب بهذه المعلومات');
          }
          return EMPTY;
        }),
        tap((res: any) => {
            this.token = res.access;
            this.refreshToken = res.refresh;
            this.initialize();
        })
      )
  }

  logout() {
    this.token = null;
    this.refreshToken = null;
    this._currentUser.set(null);
  }
}

export interface CurrentUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  groups: Group[];
  isAdmin: boolean;
}
