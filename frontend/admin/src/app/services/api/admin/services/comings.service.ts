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

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param ordering Which field to use when ordering the results.
   */
  comingsCategoryListResponse(ordering?: string): __Observable<__StrictHttpResponse<Array<ComingCategoryList>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (ordering != null) __params = __params.set('ordering', ordering.toString());
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
        return _r as __StrictHttpResponse<Array<ComingCategoryList>>;
      })
    );
  }
  /**
   * @param ordering Which field to use when ordering the results.
   */
  comingsCategoryList(ordering?: string): __Observable<Array<ComingCategoryList>> {
    return this.comingsCategoryListResponse(ordering).pipe(
      __map(_r => _r.body as Array<ComingCategoryList>)
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
   * @param id undefined
   */
  comingsCategoryReadResponse(id: string): __Observable<__StrictHttpResponse<ComingCategoryList>> {
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
   * @param id undefined
   */
  comingsCategoryRead(id: string): __Observable<ComingCategoryList> {
    return this.comingsCategoryReadResponse(id).pipe(
      __map(_r => _r.body as ComingCategoryList)
    );
  }

  /**
   * @param params The `ComingsService.ComingsCategoryUpdateParams` containing the following parameters:
   *
   * - `id`:
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
   * - `id`:
   *
   * - `data`:
   */
  comingsCategoryUpdate(params: ComingsService.ComingsCategoryUpdateParams): __Observable<ComingCategoryUpdate> {
    return this.comingsCategoryUpdateResponse(params).pipe(
      __map(_r => _r.body as ComingCategoryUpdate)
    );
  }

  /**
   * @param id undefined
   */
  comingsCategoryDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
   * @param id undefined
   */
  comingsCategoryDelete(id: string): __Observable<null> {
    return this.comingsCategoryDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ComingsService.ComingsComingListParams` containing the following parameters:
   *
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `registered_at__lt`: registered_at__lt
   *
   * - `registered_at__gt`: registered_at__gt
   *
   * - `registered_at`: registered_at
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `master`: master
   *
   * - `limit`: Number of results to return per page.
   *
   * - `is_doubled`: is_doubled
   *
   * - `category`: category
   */
  comingsComingListResponse(params: ComingsService.ComingsComingListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ComingList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.studentName != null) __params = __params.set('student__name', params.studentName.toString());
    if (params.registeredAtLt != null) __params = __params.set('registered_at__lt', params.registeredAtLt.toString());
    if (params.registeredAtGt != null) __params = __params.set('registered_at__gt', params.registeredAtGt.toString());
    if (params.registeredAt != null) __params = __params.set('registered_at', params.registeredAt.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.master != null) __params = __params.set('master', params.master.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.isDoubled != null) __params = __params.set('is_doubled', params.isDoubled.toString());
    if (params.category != null) __params = __params.set('category', params.category.toString());
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
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `registered_at__lt`: registered_at__lt
   *
   * - `registered_at__gt`: registered_at__gt
   *
   * - `registered_at`: registered_at
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `master`: master
   *
   * - `limit`: Number of results to return per page.
   *
   * - `is_doubled`: is_doubled
   *
   * - `category`: category
   */
  comingsComingList(params: ComingsService.ComingsComingListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ComingList>}> {
    return this.comingsComingListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ComingList>})
    );
  }

  /**
   * @param id undefined
   */
  comingsComingReadResponse(id: string): __Observable<__StrictHttpResponse<ComingList>> {
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
   * @param id undefined
   */
  comingsComingRead(id: string): __Observable<ComingList> {
    return this.comingsComingReadResponse(id).pipe(
      __map(_r => _r.body as ComingList)
    );
  }

  /**
   * @param id undefined
   */
  comingsComingDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
   * @param id undefined
   */
  comingsComingDelete(id: string): __Observable<null> {
    return this.comingsComingDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ComingsService {

  /**
   * Parameters for comingsCategoryUpdate
   */
  export interface ComingsCategoryUpdateParams {
    id: string;
    data: ComingCategoryUpdate;
  }

  /**
   * Parameters for comingsComingList
   */
  export interface ComingsComingListParams {

    /**
     * param for filtering result via student name or student id
     */
    studentName?: string;

    /**
     * registered_at__lt
     */
    registeredAtLt?: string;

    /**
     * registered_at__gt
     */
    registeredAtGt?: string;

    /**
     * registered_at
     */
    registeredAt?: string;

    /**
     * Which field to use when ordering the results.
     */
    ordering?: string;

    /**
     * The initial index from which to return the results.
     */
    offset?: number;

    /**
     * master
     */
    master?: string;

    /**
     * Number of results to return per page.
     */
    limit?: number;

    /**
     * is_doubled
     */
    isDoubled?: string;

    /**
     * category
     */
    category?: string;
  }
}

export { ComingsService }
