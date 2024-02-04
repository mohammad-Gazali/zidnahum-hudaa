/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GroupList } from '../models/group-list';
import { GroupCreate } from '../models/group-create';
import { GroupUpdate } from '../models/group-update';
import { UserList } from '../models/user-list';
import { UserCreate } from '../models/user-create';
import { UserUpdate } from '../models/user-update';
@Injectable({
  providedIn: 'root',
})
class AuthService extends __BaseService {
  static readonly authGroupListPath = '/auth/group/';
  static readonly authGroupCreatePath = '/auth/group/';
  static readonly authGroupReadPath = '/auth/group/{id}/';
  static readonly authGroupUpdatePath = '/auth/group/{id}/';
  static readonly authGroupDeletePath = '/auth/group/{id}/';
  static readonly authUserListPath = '/auth/user/';
  static readonly authUserCreatePath = '/auth/user/';
  static readonly authUserReadPath = '/auth/user/{id}/';
  static readonly authUserUpdatePath = '/auth/user/{id}/';
  static readonly authUserDeletePath = '/auth/user/{id}/';

  /**
   * @param params The `AuthService.AuthGroupListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  authGroupListResponse(params: AuthService.AuthGroupListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<GroupList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/group/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<GroupList>}>;
      })
    );
  }
  /**
   * @param params The `AuthService.AuthGroupListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  authGroupList(params: AuthService.AuthGroupListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<GroupList>}> {
    return this.authGroupListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<GroupList>})
    );
  }

  /**
   * @param data undefined
   */
  authGroupCreateResponse(data: GroupCreate): __Observable<__StrictHttpResponse<GroupCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/group/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authGroupCreate(data: GroupCreate): __Observable<GroupCreate> {
    return this.authGroupCreateResponse(data).pipe(
      __map(_r => _r.body as GroupCreate)
    );
  }

  /**
   * @param id A unique integer value identifying this مجموعة.
   */
  authGroupReadResponse(id: number): __Observable<__StrictHttpResponse<GroupList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/group/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupList>;
      })
    );
  }
  /**
   * @param id A unique integer value identifying this مجموعة.
   */
  authGroupRead(id: number): __Observable<GroupList> {
    return this.authGroupReadResponse(id).pipe(
      __map(_r => _r.body as GroupList)
    );
  }

  /**
   * @param params The `AuthService.AuthGroupUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this مجموعة.
   *
   * - `data`:
   */
  authGroupUpdateResponse(params: AuthService.AuthGroupUpdateParams): __Observable<__StrictHttpResponse<GroupUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/auth/group/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupUpdate>;
      })
    );
  }
  /**
   * @param params The `AuthService.AuthGroupUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this مجموعة.
   *
   * - `data`:
   */
  authGroupUpdate(params: AuthService.AuthGroupUpdateParams): __Observable<GroupUpdate> {
    return this.authGroupUpdateResponse(params).pipe(
      __map(_r => _r.body as GroupUpdate)
    );
  }

  /**
   * @param id A unique integer value identifying this مجموعة.
   */
  authGroupDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/auth/group/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id A unique integer value identifying this مجموعة.
   */
  authGroupDelete(id: number): __Observable<null> {
    return this.authGroupDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `AuthService.AuthUserListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  authUserListResponse(params: AuthService.AuthUserListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<UserList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/user/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<UserList>}>;
      })
    );
  }
  /**
   * @param params The `AuthService.AuthUserListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  authUserList(params: AuthService.AuthUserListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<UserList>}> {
    return this.authUserListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<UserList>})
    );
  }

  /**
   * @param data undefined
   */
  authUserCreateResponse(data: UserCreate): __Observable<__StrictHttpResponse<UserCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/user/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authUserCreate(data: UserCreate): __Observable<UserCreate> {
    return this.authUserCreateResponse(data).pipe(
      __map(_r => _r.body as UserCreate)
    );
  }

  /**
   * @param id A unique integer value identifying this المستخدم.
   */
  authUserReadResponse(id: number): __Observable<__StrictHttpResponse<UserList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/user/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserList>;
      })
    );
  }
  /**
   * @param id A unique integer value identifying this المستخدم.
   */
  authUserRead(id: number): __Observable<UserList> {
    return this.authUserReadResponse(id).pipe(
      __map(_r => _r.body as UserList)
    );
  }

  /**
   * @param params The `AuthService.AuthUserUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this المستخدم.
   *
   * - `data`:
   */
  authUserUpdateResponse(params: AuthService.AuthUserUpdateParams): __Observable<__StrictHttpResponse<UserUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/auth/user/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserUpdate>;
      })
    );
  }
  /**
   * @param params The `AuthService.AuthUserUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this المستخدم.
   *
   * - `data`:
   */
  authUserUpdate(params: AuthService.AuthUserUpdateParams): __Observable<UserUpdate> {
    return this.authUserUpdateResponse(params).pipe(
      __map(_r => _r.body as UserUpdate)
    );
  }

  /**
   * @param id A unique integer value identifying this المستخدم.
   */
  authUserDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/auth/user/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id A unique integer value identifying this المستخدم.
   */
  authUserDelete(id: number): __Observable<null> {
    return this.authUserDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module AuthService {

  /**
   * Parameters for authGroupList
   */
  export interface AuthGroupListParams {

    /**
     * Which field to use when ordering the results.
     */
    ordering?: string;

    /**
     * The initial index from which to return the results.
     */
    offset?: number;

    /**
     * Number of results to return per page.
     */
    limit?: number;
  }

  /**
   * Parameters for authGroupUpdate
   */
  export interface AuthGroupUpdateParams {

    /**
     * A unique integer value identifying this مجموعة.
     */
    id: number;
    data: GroupUpdate;
  }

  /**
   * Parameters for authUserList
   */
  export interface AuthUserListParams {

    /**
     * Which field to use when ordering the results.
     */
    ordering?: string;

    /**
     * The initial index from which to return the results.
     */
    offset?: number;

    /**
     * Number of results to return per page.
     */
    limit?: number;
  }

  /**
   * Parameters for authUserUpdate
   */
  export interface AuthUserUpdateParams {

    /**
     * A unique integer value identifying this المستخدم.
     */
    id: number;
    data: UserUpdate;
  }
}

export { AuthService }
