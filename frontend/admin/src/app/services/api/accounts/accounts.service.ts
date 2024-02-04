import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { TokenObtainPairBody, TokenObtainPairResponse, TokenRefreshBody, TokenRefreshResponse, UserDetailsResponse } from './accounts.types';

@Injectable({
    providedIn: 'root'
})
export class AccountsService {
    private http = inject(HttpClient);
    private rootUrl = 'http://127.0.0.1:8000/api/v1/accounts'

    public details = signal<UserDetailsResponse | null>(null);
    public loading = signal(true);

    public tokenObtainPair(body: TokenObtainPairBody) {
        return this.http.post<TokenObtainPairResponse>(`${this.rootUrl}/token`, body);
    }

    public tokenRefresh(body: TokenRefreshBody) {
        return this.http.post<TokenRefreshResponse>(`${this.rootUrl}/token/refresh`, body);
    }

    public userDetails() {
        return this.http.get<UserDetailsResponse>(`${this.rootUrl}/details`);
    }
}
