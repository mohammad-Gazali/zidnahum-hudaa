/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UserSerilizer } from '../models/user-serilizer';
import { TokenObtainPair } from '../models/token-obtain-pair';
import { TokenRefresh } from '../models/token-refresh';
@Injectable({
  providedIn: 'root',
})
class AccountsService extends __BaseService {
  static readonly accountsDetailsListPath = '/accounts/details';
  static readonly accountsTokenCreatePath = '/accounts/token';
  static readonly accountsTokenRefreshCreatePath = '/accounts/token/refresh';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  accountsDetailsListResponse(): __Observable<__StrictHttpResponse<UserSerilizer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/details`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserSerilizer>;
      })
    );
  }  accountsDetailsList(): __Observable<UserSerilizer> {
    return this.accountsDetailsListResponse().pipe(
      __map(_r => _r.body as UserSerilizer)
    );
  }

  /**
   * Takes a set of user credentials and returns an access and refresh JSON web
   * token pair to prove the authentication of those credentials.
   * @param data undefined
   */
  accountsTokenCreateResponse(data: TokenObtainPair): __Observable<__StrictHttpResponse<TokenObtainPair>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TokenObtainPair>;
      })
    );
  }
  /**
   * Takes a set of user credentials and returns an access and refresh JSON web
   * token pair to prove the authentication of those credentials.
   * @param data undefined
   */
  accountsTokenCreate(data: TokenObtainPair): __Observable<TokenObtainPair> {
    return this.accountsTokenCreateResponse(data).pipe(
      __map(_r => _r.body as TokenObtainPair)
    );
  }

  /**
   * Takes a refresh type JSON web token and returns an access type JSON web
   * token if the refresh token is valid.
   * @param data undefined
   */
  accountsTokenRefreshCreateResponse(data: TokenRefresh): __Observable<__StrictHttpResponse<TokenRefresh>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts/token/refresh`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TokenRefresh>;
      })
    );
  }
  /**
   * Takes a refresh type JSON web token and returns an access type JSON web
   * token if the refresh token is valid.
   * @param data undefined
   */
  accountsTokenRefreshCreate(data: TokenRefresh): __Observable<TokenRefresh> {
    return this.accountsTokenRefreshCreateResponse(data).pipe(
      __map(_r => _r.body as TokenRefresh)
    );
  }
}

module AccountsService {
}

export { AccountsService }
