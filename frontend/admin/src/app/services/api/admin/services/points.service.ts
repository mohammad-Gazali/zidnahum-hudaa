/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PointsAddingCauseList } from '../models/points-adding-cause-list';
import { PointsAddingCauseCreate } from '../models/points-adding-cause-create';
import { PointsAddingCauseUpdate } from '../models/points-adding-cause-update';
import { PointsAddingList } from '../models/points-adding-list';
import { PointsDeletingCauseList } from '../models/points-deleting-cause-list';
import { PointsDeletingCauseCreate } from '../models/points-deleting-cause-create';
import { PointsDeletingCauseUpdate } from '../models/points-deleting-cause-update';
import { PointsDeletingList } from '../models/points-deleting-list';
@Injectable({
  providedIn: 'root',
})
class PointsService extends __BaseService {
  static readonly pointsAddingCauseListPath = '/points/adding-cause/';
  static readonly pointsAddingCauseCreatePath = '/points/adding-cause/';
  static readonly pointsAddingCauseReadPath = '/points/adding-cause/{id}/';
  static readonly pointsAddingCauseUpdatePath = '/points/adding-cause/{id}/';
  static readonly pointsAddingCauseDeletePath = '/points/adding-cause/{id}/';
  static readonly pointsAddingListPath = '/points/adding/';
  static readonly pointsAddingReadPath = '/points/adding/{id}/';
  static readonly pointsAddingDeletePath = '/points/adding/{id}/';
  static readonly pointsDeletingCauseListPath = '/points/deleting-cause/';
  static readonly pointsDeletingCauseCreatePath = '/points/deleting-cause/';
  static readonly pointsDeletingCauseReadPath = '/points/deleting-cause/{id}/';
  static readonly pointsDeletingCauseUpdatePath = '/points/deleting-cause/{id}/';
  static readonly pointsDeletingCauseDeletePath = '/points/deleting-cause/{id}/';
  static readonly pointsDeletingListPath = '/points/deleting/';
  static readonly pointsDeletingReadPath = '/points/deleting/{id}/';
  static readonly pointsDeletingDeletePath = '/points/deleting/{id}/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param ordering Which field to use when ordering the results.
   */
  pointsAddingCauseListResponse(ordering?: string): __Observable<__StrictHttpResponse<Array<PointsAddingCauseList>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (ordering != null) __params = __params.set('ordering', ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/points/adding-cause/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PointsAddingCauseList>>;
      })
    );
  }
  /**
   * @param ordering Which field to use when ordering the results.
   */
  pointsAddingCauseList(ordering?: string): __Observable<Array<PointsAddingCauseList>> {
    return this.pointsAddingCauseListResponse(ordering).pipe(
      __map(_r => _r.body as Array<PointsAddingCauseList>)
    );
  }

  /**
   * @param data undefined
   */
  pointsAddingCauseCreateResponse(data: PointsAddingCauseCreate): __Observable<__StrictHttpResponse<PointsAddingCauseCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/points/adding-cause/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PointsAddingCauseCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  pointsAddingCauseCreate(data: PointsAddingCauseCreate): __Observable<PointsAddingCauseCreate> {
    return this.pointsAddingCauseCreateResponse(data).pipe(
      __map(_r => _r.body as PointsAddingCauseCreate)
    );
  }

  /**
   * @param id undefined
   */
  pointsAddingCauseReadResponse(id: string): __Observable<__StrictHttpResponse<PointsAddingCauseList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/points/adding-cause/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PointsAddingCauseList>;
      })
    );
  }
  /**
   * @param id undefined
   */
  pointsAddingCauseRead(id: string): __Observable<PointsAddingCauseList> {
    return this.pointsAddingCauseReadResponse(id).pipe(
      __map(_r => _r.body as PointsAddingCauseList)
    );
  }

  /**
   * @param params The `PointsService.PointsAddingCauseUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  pointsAddingCauseUpdateResponse(params: PointsService.PointsAddingCauseUpdateParams): __Observable<__StrictHttpResponse<PointsAddingCauseUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/points/adding-cause/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PointsAddingCauseUpdate>;
      })
    );
  }
  /**
   * @param params The `PointsService.PointsAddingCauseUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  pointsAddingCauseUpdate(params: PointsService.PointsAddingCauseUpdateParams): __Observable<PointsAddingCauseUpdate> {
    return this.pointsAddingCauseUpdateResponse(params).pipe(
      __map(_r => _r.body as PointsAddingCauseUpdate)
    );
  }

  /**
   * @param id undefined
   */
  pointsAddingCauseDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/points/adding-cause/${encodeURIComponent(String(id))}/`,
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
  pointsAddingCauseDelete(id: string): __Observable<null> {
    return this.pointsAddingCauseDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `PointsService.PointsAddingListParams` containing the following parameters:
   *
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `student__masjed`: student__masjed
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `master__isnull`: master__isnull
   *
   * - `master`: master
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
   */
  pointsAddingListResponse(params: PointsService.PointsAddingListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PointsAddingList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.studentName != null) __params = __params.set('student__name', params.studentName.toString());
    if (params.studentMasjed != null) __params = __params.set('student__masjed', params.studentMasjed.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.masterIsnull != null) __params = __params.set('master__isnull', params.masterIsnull.toString());
    if (params.master != null) __params = __params.set('master', params.master.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.createdAtLt != null) __params = __params.set('created_at__lt', params.createdAtLt.toString());
    if (params.createdAtGt != null) __params = __params.set('created_at__gt', params.createdAtGt.toString());
    if (params.createdAtDate != null) __params = __params.set('created_at__date', params.createdAtDate.toString());
    if (params.cause != null) __params = __params.set('cause', params.cause.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/points/adding/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PointsAddingList>}>;
      })
    );
  }
  /**
   * @param params The `PointsService.PointsAddingListParams` containing the following parameters:
   *
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `student__masjed`: student__masjed
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `master__isnull`: master__isnull
   *
   * - `master`: master
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
   */
  pointsAddingList(params: PointsService.PointsAddingListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<PointsAddingList>}> {
    return this.pointsAddingListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<PointsAddingList>})
    );
  }

  /**
   * @param id undefined
   */
  pointsAddingReadResponse(id: string): __Observable<__StrictHttpResponse<PointsAddingList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/points/adding/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PointsAddingList>;
      })
    );
  }
  /**
   * @param id undefined
   */
  pointsAddingRead(id: string): __Observable<PointsAddingList> {
    return this.pointsAddingReadResponse(id).pipe(
      __map(_r => _r.body as PointsAddingList)
    );
  }

  /**
   * @param id undefined
   */
  pointsAddingDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/points/adding/${encodeURIComponent(String(id))}/`,
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
  pointsAddingDelete(id: string): __Observable<null> {
    return this.pointsAddingDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param ordering Which field to use when ordering the results.
   */
  pointsDeletingCauseListResponse(ordering?: string): __Observable<__StrictHttpResponse<Array<PointsDeletingCauseList>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (ordering != null) __params = __params.set('ordering', ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/points/deleting-cause/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PointsDeletingCauseList>>;
      })
    );
  }
  /**
   * @param ordering Which field to use when ordering the results.
   */
  pointsDeletingCauseList(ordering?: string): __Observable<Array<PointsDeletingCauseList>> {
    return this.pointsDeletingCauseListResponse(ordering).pipe(
      __map(_r => _r.body as Array<PointsDeletingCauseList>)
    );
  }

  /**
   * @param data undefined
   */
  pointsDeletingCauseCreateResponse(data: PointsDeletingCauseCreate): __Observable<__StrictHttpResponse<PointsDeletingCauseCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/points/deleting-cause/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PointsDeletingCauseCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  pointsDeletingCauseCreate(data: PointsDeletingCauseCreate): __Observable<PointsDeletingCauseCreate> {
    return this.pointsDeletingCauseCreateResponse(data).pipe(
      __map(_r => _r.body as PointsDeletingCauseCreate)
    );
  }

  /**
   * @param id undefined
   */
  pointsDeletingCauseReadResponse(id: string): __Observable<__StrictHttpResponse<PointsDeletingCauseList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/points/deleting-cause/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PointsDeletingCauseList>;
      })
    );
  }
  /**
   * @param id undefined
   */
  pointsDeletingCauseRead(id: string): __Observable<PointsDeletingCauseList> {
    return this.pointsDeletingCauseReadResponse(id).pipe(
      __map(_r => _r.body as PointsDeletingCauseList)
    );
  }

  /**
   * @param params The `PointsService.PointsDeletingCauseUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  pointsDeletingCauseUpdateResponse(params: PointsService.PointsDeletingCauseUpdateParams): __Observable<__StrictHttpResponse<PointsDeletingCauseUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/points/deleting-cause/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PointsDeletingCauseUpdate>;
      })
    );
  }
  /**
   * @param params The `PointsService.PointsDeletingCauseUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  pointsDeletingCauseUpdate(params: PointsService.PointsDeletingCauseUpdateParams): __Observable<PointsDeletingCauseUpdate> {
    return this.pointsDeletingCauseUpdateResponse(params).pipe(
      __map(_r => _r.body as PointsDeletingCauseUpdate)
    );
  }

  /**
   * @param id undefined
   */
  pointsDeletingCauseDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/points/deleting-cause/${encodeURIComponent(String(id))}/`,
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
  pointsDeletingCauseDelete(id: string): __Observable<null> {
    return this.pointsDeletingCauseDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `PointsService.PointsDeletingListParams` containing the following parameters:
   *
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `student__masjed`: student__masjed
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `master__isnull`: master__isnull
   *
   * - `master`: master
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
   */
  pointsDeletingListResponse(params: PointsService.PointsDeletingListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PointsDeletingList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.studentName != null) __params = __params.set('student__name', params.studentName.toString());
    if (params.studentMasjed != null) __params = __params.set('student__masjed', params.studentMasjed.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.masterIsnull != null) __params = __params.set('master__isnull', params.masterIsnull.toString());
    if (params.master != null) __params = __params.set('master', params.master.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.createdAtLt != null) __params = __params.set('created_at__lt', params.createdAtLt.toString());
    if (params.createdAtGt != null) __params = __params.set('created_at__gt', params.createdAtGt.toString());
    if (params.createdAtDate != null) __params = __params.set('created_at__date', params.createdAtDate.toString());
    if (params.cause != null) __params = __params.set('cause', params.cause.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/points/deleting/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PointsDeletingList>}>;
      })
    );
  }
  /**
   * @param params The `PointsService.PointsDeletingListParams` containing the following parameters:
   *
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `student__masjed`: student__masjed
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `master__isnull`: master__isnull
   *
   * - `master`: master
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
   */
  pointsDeletingList(params: PointsService.PointsDeletingListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<PointsDeletingList>}> {
    return this.pointsDeletingListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<PointsDeletingList>})
    );
  }

  /**
   * @param id undefined
   */
  pointsDeletingReadResponse(id: string): __Observable<__StrictHttpResponse<PointsDeletingList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/points/deleting/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PointsDeletingList>;
      })
    );
  }
  /**
   * @param id undefined
   */
  pointsDeletingRead(id: string): __Observable<PointsDeletingList> {
    return this.pointsDeletingReadResponse(id).pipe(
      __map(_r => _r.body as PointsDeletingList)
    );
  }

  /**
   * @param id undefined
   */
  pointsDeletingDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/points/deleting/${encodeURIComponent(String(id))}/`,
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
  pointsDeletingDelete(id: string): __Observable<null> {
    return this.pointsDeletingDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module PointsService {

  /**
   * Parameters for pointsAddingCauseUpdate
   */
  export interface PointsAddingCauseUpdateParams {
    id: string;
    data: PointsAddingCauseUpdate;
  }

  /**
   * Parameters for pointsAddingList
   */
  export interface PointsAddingListParams {

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
     * master__isnull
     */
    masterIsnull?: string;

    /**
     * master
     */
    master?: string;

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
  }

  /**
   * Parameters for pointsDeletingCauseUpdate
   */
  export interface PointsDeletingCauseUpdateParams {
    id: string;
    data: PointsDeletingCauseUpdate;
  }

  /**
   * Parameters for pointsDeletingList
   */
  export interface PointsDeletingListParams {

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
     * master__isnull
     */
    masterIsnull?: string;

    /**
     * master
     */
    master?: string;

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
  }
}

export { PointsService }
