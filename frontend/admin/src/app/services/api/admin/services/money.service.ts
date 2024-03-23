/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { MoneyDeletingCauseList } from '../models/money-deleting-cause-list';
import { MoneyDeletingCauseCreate } from '../models/money-deleting-cause-create';
import { MoneyDeletingCauseUpdate } from '../models/money-deleting-cause-update';
import { MoneyDeletingList } from '../models/money-deleting-list';
import { MoneyDeletingCreate } from '../models/money-deleting-create';
import { MoneyDeletingUpdate } from '../models/money-deleting-update';
@Injectable({
  providedIn: 'root',
})
class MoneyService extends __BaseService {
  static readonly moneyDeletingCauseListPath = '/money/deleting-cause/';
  static readonly moneyDeletingCauseCreatePath = '/money/deleting-cause/';
  static readonly moneyDeletingCauseReadPath = '/money/deleting-cause/{id}/';
  static readonly moneyDeletingCauseUpdatePath = '/money/deleting-cause/{id}/';
  static readonly moneyDeletingCauseDeletePath = '/money/deleting-cause/{id}/';
  static readonly moneyDeletingListPath = '/money/deleting/';
  static readonly moneyDeletingCreatePath = '/money/deleting/';
  static readonly moneyDeletingReadPath = '/money/deleting/{id}/';
  static readonly moneyDeletingUpdatePath = '/money/deleting/{id}/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param ordering Which field to use when ordering the results.
   */
  moneyDeletingCauseListResponse(ordering?: string): __Observable<__StrictHttpResponse<Array<MoneyDeletingCauseList>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (ordering != null) __params = __params.set('ordering', ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/money/deleting-cause/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<MoneyDeletingCauseList>>;
      })
    );
  }
  /**
   * @param ordering Which field to use when ordering the results.
   */
  moneyDeletingCauseList(ordering?: string): __Observable<Array<MoneyDeletingCauseList>> {
    return this.moneyDeletingCauseListResponse(ordering).pipe(
      __map(_r => _r.body as Array<MoneyDeletingCauseList>)
    );
  }

  /**
   * @param data undefined
   */
  moneyDeletingCauseCreateResponse(data: MoneyDeletingCauseCreate): __Observable<__StrictHttpResponse<MoneyDeletingCauseCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/money/deleting-cause/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MoneyDeletingCauseCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  moneyDeletingCauseCreate(data: MoneyDeletingCauseCreate): __Observable<MoneyDeletingCauseCreate> {
    return this.moneyDeletingCauseCreateResponse(data).pipe(
      __map(_r => _r.body as MoneyDeletingCauseCreate)
    );
  }

  /**
   * @param id undefined
   */
  moneyDeletingCauseReadResponse(id: string): __Observable<__StrictHttpResponse<MoneyDeletingCauseList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/money/deleting-cause/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MoneyDeletingCauseList>;
      })
    );
  }
  /**
   * @param id undefined
   */
  moneyDeletingCauseRead(id: string): __Observable<MoneyDeletingCauseList> {
    return this.moneyDeletingCauseReadResponse(id).pipe(
      __map(_r => _r.body as MoneyDeletingCauseList)
    );
  }

  /**
   * @param params The `MoneyService.MoneyDeletingCauseUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  moneyDeletingCauseUpdateResponse(params: MoneyService.MoneyDeletingCauseUpdateParams): __Observable<__StrictHttpResponse<MoneyDeletingCauseUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/money/deleting-cause/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MoneyDeletingCauseUpdate>;
      })
    );
  }
  /**
   * @param params The `MoneyService.MoneyDeletingCauseUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  moneyDeletingCauseUpdate(params: MoneyService.MoneyDeletingCauseUpdateParams): __Observable<MoneyDeletingCauseUpdate> {
    return this.moneyDeletingCauseUpdateResponse(params).pipe(
      __map(_r => _r.body as MoneyDeletingCauseUpdate)
    );
  }

  /**
   * @param id undefined
   */
  moneyDeletingCauseDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/money/deleting-cause/${encodeURIComponent(String(id))}/`,
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
  moneyDeletingCauseDelete(id: string): __Observable<null> {
    return this.moneyDeletingCauseDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MoneyService.MoneyDeletingListParams` containing the following parameters:
   *
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `student__masjed`: student__masjed
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   *
   * - `created_at__lt`: created_at__lt
   *
   * - `created_at__gt`: created_at__gt
   *
   * - `created_at__date`: created_at__date
   *
   * - `cause`: cause
   *
   * - `active_to_points`: active_to_points
   */
  moneyDeletingListResponse(params: MoneyService.MoneyDeletingListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<MoneyDeletingList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.studentName != null) __params = __params.set('student__name', params.studentName.toString());
    if (params.studentMasjed != null) __params = __params.set('student__masjed', params.studentMasjed.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.createdAtLt != null) __params = __params.set('created_at__lt', params.createdAtLt.toString());
    if (params.createdAtGt != null) __params = __params.set('created_at__gt', params.createdAtGt.toString());
    if (params.createdAtDate != null) __params = __params.set('created_at__date', params.createdAtDate.toString());
    if (params.cause != null) __params = __params.set('cause', params.cause.toString());
    if (params.activeToPoints != null) __params = __params.set('active_to_points', params.activeToPoints.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/money/deleting/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<MoneyDeletingList>}>;
      })
    );
  }
  /**
   * @param params The `MoneyService.MoneyDeletingListParams` containing the following parameters:
   *
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `student__masjed`: student__masjed
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   *
   * - `created_at__lt`: created_at__lt
   *
   * - `created_at__gt`: created_at__gt
   *
   * - `created_at__date`: created_at__date
   *
   * - `cause`: cause
   *
   * - `active_to_points`: active_to_points
   */
  moneyDeletingList(params: MoneyService.MoneyDeletingListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<MoneyDeletingList>}> {
    return this.moneyDeletingListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<MoneyDeletingList>})
    );
  }

  /**
   * @param data undefined
   */
  moneyDeletingCreateResponse(data: MoneyDeletingCreate): __Observable<__StrictHttpResponse<MoneyDeletingCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/money/deleting/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MoneyDeletingCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  moneyDeletingCreate(data: MoneyDeletingCreate): __Observable<MoneyDeletingCreate> {
    return this.moneyDeletingCreateResponse(data).pipe(
      __map(_r => _r.body as MoneyDeletingCreate)
    );
  }

  /**
   * @param id undefined
   */
  moneyDeletingReadResponse(id: string): __Observable<__StrictHttpResponse<MoneyDeletingList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/money/deleting/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MoneyDeletingList>;
      })
    );
  }
  /**
   * @param id undefined
   */
  moneyDeletingRead(id: string): __Observable<MoneyDeletingList> {
    return this.moneyDeletingReadResponse(id).pipe(
      __map(_r => _r.body as MoneyDeletingList)
    );
  }

  /**
   * @param params The `MoneyService.MoneyDeletingUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  moneyDeletingUpdateResponse(params: MoneyService.MoneyDeletingUpdateParams): __Observable<__StrictHttpResponse<MoneyDeletingUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/money/deleting/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MoneyDeletingUpdate>;
      })
    );
  }
  /**
   * @param params The `MoneyService.MoneyDeletingUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  moneyDeletingUpdate(params: MoneyService.MoneyDeletingUpdateParams): __Observable<MoneyDeletingUpdate> {
    return this.moneyDeletingUpdateResponse(params).pipe(
      __map(_r => _r.body as MoneyDeletingUpdate)
    );
  }
}

module MoneyService {

  /**
   * Parameters for moneyDeletingCauseUpdate
   */
  export interface MoneyDeletingCauseUpdateParams {
    id: string;
    data: MoneyDeletingCauseUpdate;
  }

  /**
   * Parameters for moneyDeletingList
   */
  export interface MoneyDeletingListParams {

    /**
     * param for filtering result via student name or student id
     */
    studentName?: string;

    /**
     * student__masjed
     */
    studentMasjed?: '1' | '2' | '3';

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

    /**
     * created_at__lt
     */
    createdAtLt?: string;

    /**
     * created_at__gt
     */
    createdAtGt?: string;

    /**
     * created_at__date
     */
    createdAtDate?: string;

    /**
     * cause
     */
    cause?: string;

    /**
     * active_to_points
     */
    activeToPoints?: string;
  }

  /**
   * Parameters for moneyDeletingUpdate
   */
  export interface MoneyDeletingUpdateParams {
    id: string;
    data: MoneyDeletingUpdate;
  }
}

export { MoneyService }
