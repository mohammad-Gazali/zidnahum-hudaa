import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { TokenObtainPairBody, TokenObtainPairResponse, TokenRefreshBody, TokenRefreshResponse, UserDetailsResponse } from './accounts.types';
import { ApiConfiguration } from '../admin/api-configuration';

@Injectable({
    providedIn: 'root'
})
export class AccountsService {
    private http = inject(HttpClient);
    private rootUrl = inject(ApiConfiguration).rootUrl.slice(0, -5) + 'accounts'

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
