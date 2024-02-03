/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ComingCategoryList } from '../models/coming-category-list';
import { ComingCategoryCreate } from '../models/coming-category-create';
import { ComingCategoryUpdate } from '../models/coming-category-update';
import { ComingList } from '../models/coming-list';
@Injectable({
  providedIn: 'root',
})
class ComingsService extends __BaseService {
  static readonly comingsCategoryListPath = '/comings/category/';
  static readonly comingsCategoryCreatePath = '/comings/category/';
  static readonly comingsCategoryReadPath = '/comings/category/{id}/';
  static readonly comingsCategoryUpdatePath = '/comings/category/{id}/';
  static readonly comingsCategoryDeletePath = '/comings/category/{id}/';
  static readonly comingsComingListPath = '/comings/coming/';
  static readonly comingsComingReadPath = '/comings/coming/{id}/';
  static readonly comingsComingDeletePath = '/comings/coming/{id}/';

  /**
   * @param params The `ComingsService.ComingsCategoryListParams` containing the following parameters:
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  comingsCategoryListResponse(params: ComingsService.ComingsCategoryListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ComingCategoryList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/comings/category/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ComingCategoryList>}>;
      })
    );
  }
  /**
   * @param params The `ComingsService.ComingsCategoryListParams` containing the following parameters:
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  comingsCategoryList(params: ComingsService.ComingsCategoryListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ComingCategoryList>}> {
    return this.comingsCategoryListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ComingCategoryList>})
    );
  }

  /**
   * @param data undefined
   */
  comingsCategoryCreateResponse(data: ComingCategoryCreate): __Observable<__StrictHttpResponse<ComingCategoryCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/comings/category/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ComingCategoryCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  comingsCategoryCreate(data: ComingCategoryCreate): __Observable<ComingCategoryCreate> {
    return this.comingsCategoryCreateResponse(data).pipe(
      __map(_r => _r.body as ComingCategoryCreate)
    );
  }

  /**
   * @param id A unique integer value identifying this سبب الحضور.
   */
  comingsCategoryReadResponse(id: number): __Observable<__StrictHttpResponse<ComingCategoryList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/comings/category/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ComingCategoryList>;
      })
    );
  }
  /**
   * @param id A unique integer value identifying this سبب الحضور.
   */
  comingsCategoryRead(id: number): __Observable<ComingCategoryList> {
    return this.comingsCategoryReadResponse(id).pipe(
      __map(_r => _r.body as ComingCategoryList)
    );
  }

  /**
   * @param params The `ComingsService.ComingsCategoryUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this سبب الحضور.
   *
   * - `data`:
   */
  comingsCategoryUpdateResponse(params: ComingsService.ComingsCategoryUpdateParams): __Observable<__StrictHttpResponse<ComingCategoryUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/comings/category/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ComingCategoryUpdate>;
      })
    );
  }
  /**
   * @param params The `ComingsService.ComingsCategoryUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this سبب الحضور.
   *
   * - `data`:
   */
  comingsCategoryUpdate(params: ComingsService.ComingsCategoryUpdateParams): __Observable<ComingCategoryUpdate> {
    return this.comingsCategoryUpdateResponse(params).pipe(
      __map(_r => _r.body as ComingCategoryUpdate)
    );
  }

  /**
   * @param id A unique integer value identifying this سبب الحضور.
   */
  comingsCategoryDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/comings/category/${encodeURIComponent(String(id))}/`,
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
   * @param id A unique integer value identifying this سبب الحضور.
   */
  comingsCategoryDelete(id: number): __Observable<null> {
    return this.comingsCategoryDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ComingsService.ComingsComingListParams` containing the following parameters:
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  comingsComingListResponse(params: ComingsService.ComingsComingListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ComingList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/comings/coming/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ComingList>}>;
      })
    );
  }
  /**
   * @param params The `ComingsService.ComingsComingListParams` containing the following parameters:
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  comingsComingList(params: ComingsService.ComingsComingListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ComingList>}> {
    return this.comingsComingListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ComingList>})
    );
  }

  /**
   * @param id A unique integer value identifying this تسجيل حضور.
   */
  comingsComingReadResponse(id: number): __Observable<__StrictHttpResponse<ComingList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/comings/coming/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ComingList>;
      })
    );
  }
  /**
   * @param id A unique integer value identifying this تسجيل حضور.
   */
  comingsComingRead(id: number): __Observable<ComingList> {
    return this.comingsComingReadResponse(id).pipe(
      __map(_r => _r.body as ComingList)
    );
  }

  /**
   * @param id A unique integer value identifying this تسجيل حضور.
   */
  comingsComingDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/comings/coming/${encodeURIComponent(String(id))}/`,
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
   * @param id A unique integer value identifying this تسجيل حضور.
   */
  comingsComingDelete(id: number): __Observable<null> {
    return this.comingsComingDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ComingsService {

  /**
   * Parameters for comingsCategoryList
   */
  export interface ComingsCategoryListParams {

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
   * Parameters for comingsCategoryUpdate
   */
  export interface ComingsCategoryUpdateParams {

    /**
     * A unique integer value identifying this سبب الحضور.
     */
    id: number;
    data: ComingCategoryUpdate;
  }

  /**
   * Parameters for comingsComingList
   */
  export interface ComingsComingListParams {

    /**
     * The initial index from which to return the results.
     */
    offset?: number;

    /**
     * Number of results to return per page.
     */
    limit?: number;
  }
}

export { ComingsService }
