/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PointsAddingCauseList } from '../models/points-adding-cause-list';
import { PointsAddingCauseCreate } from '../models/points-adding-cause-create';
import { PointsAddingCauseUpdate } from '../models/points-adding-cause-update';
import { PointsAddingList } from '../models/points-adding-list';
import { PointsAddingUpdate } from '../models/points-adding-update';
import { PointsDeletingCauseList } from '../models/points-deleting-cause-list';
import { PointsDeletingCauseCreate } from '../models/points-deleting-cause-create';
import { PointsDeletingCauseUpdate } from '../models/points-deleting-cause-update';
import { PointsDeletingList } from '../models/points-deleting-list';
import { PointsDeletingUpdate } from '../models/points-deleting-update';
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
  static readonly pointsAddingUpdatePath = '/points/adding/{id}/';
  static readonly pointsAddingDeletePath = '/points/adding/{id}/';
  static readonly pointsDeletingCauseListPath = '/points/deleting-cause/';
  static readonly pointsDeletingCauseCreatePath = '/points/deleting-cause/';
  static readonly pointsDeletingCauseReadPath = '/points/deleting-cause/{id}/';
  static readonly pointsDeletingCauseUpdatePath = '/points/deleting-cause/{id}/';
  static readonly pointsDeletingCauseDeletePath = '/points/deleting-cause/{id}/';
  static readonly pointsDeletingListPath = '/points/deleting/';
  static readonly pointsDeletingReadPath = '/points/deleting/{id}/';
  static readonly pointsDeletingUpdatePath = '/points/deleting/{id}/';
  static readonly pointsDeletingDeletePath = '/points/deleting/{id}/';

  /**
   * @param params The `PointsService.PointsAddingCauseListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  pointsAddingCauseListResponse(params: PointsService.PointsAddingCauseListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PointsAddingCauseList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
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
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PointsAddingCauseList>}>;
      })
    );
  }
  /**
   * @param params The `PointsService.PointsAddingCauseListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  pointsAddingCauseList(params: PointsService.PointsAddingCauseListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<PointsAddingCauseList>}> {
    return this.pointsAddingCauseListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<PointsAddingCauseList>})
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
   * @param id A unique integer value identifying this سبب إضافة.
   */
  pointsAddingCauseReadResponse(id: number): __Observable<__StrictHttpResponse<PointsAddingCauseList>> {
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
   * @param id A unique integer value identifying this سبب إضافة.
   */
  pointsAddingCauseRead(id: number): __Observable<PointsAddingCauseList> {
    return this.pointsAddingCauseReadResponse(id).pipe(
      __map(_r => _r.body as PointsAddingCauseList)
    );
  }

  /**
   * @param params The `PointsService.PointsAddingCauseUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this سبب إضافة.
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
   * - `id`: A unique integer value identifying this سبب إضافة.
   *
   * - `data`:
   */
  pointsAddingCauseUpdate(params: PointsService.PointsAddingCauseUpdateParams): __Observable<PointsAddingCauseUpdate> {
    return this.pointsAddingCauseUpdateResponse(params).pipe(
      __map(_r => _r.body as PointsAddingCauseUpdate)
    );
  }

  /**
   * @param id A unique integer value identifying this سبب إضافة.
   */
  pointsAddingCauseDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
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
   * @param id A unique integer value identifying this سبب إضافة.
   */
  pointsAddingCauseDelete(id: number): __Observable<null> {
    return this.pointsAddingCauseDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `PointsService.PointsAddingListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  pointsAddingListResponse(params: PointsService.PointsAddingListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PointsAddingList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
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
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  pointsAddingList(params: PointsService.PointsAddingListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<PointsAddingList>}> {
    return this.pointsAddingListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<PointsAddingList>})
    );
  }

  /**
   * @param id A unique integer value identifying this إضافة نقاط.
   */
  pointsAddingReadResponse(id: number): __Observable<__StrictHttpResponse<PointsAddingList>> {
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
   * @param id A unique integer value identifying this إضافة نقاط.
   */
  pointsAddingRead(id: number): __Observable<PointsAddingList> {
    return this.pointsAddingReadResponse(id).pipe(
      __map(_r => _r.body as PointsAddingList)
    );
  }

  /**
   * @param params The `PointsService.PointsAddingUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this إضافة نقاط.
   *
   * - `data`:
   */
  pointsAddingUpdateResponse(params: PointsService.PointsAddingUpdateParams): __Observable<__StrictHttpResponse<PointsAddingUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/points/adding/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PointsAddingUpdate>;
      })
    );
  }
  /**
   * @param params The `PointsService.PointsAddingUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this إضافة نقاط.
   *
   * - `data`:
   */
  pointsAddingUpdate(params: PointsService.PointsAddingUpdateParams): __Observable<PointsAddingUpdate> {
    return this.pointsAddingUpdateResponse(params).pipe(
      __map(_r => _r.body as PointsAddingUpdate)
    );
  }

  /**
   * @param id A unique integer value identifying this إضافة نقاط.
   */
  pointsAddingDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
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
   * @param id A unique integer value identifying this إضافة نقاط.
   */
  pointsAddingDelete(id: number): __Observable<null> {
    return this.pointsAddingDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `PointsService.PointsDeletingCauseListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  pointsDeletingCauseListResponse(params: PointsService.PointsDeletingCauseListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PointsDeletingCauseList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
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
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PointsDeletingCauseList>}>;
      })
    );
  }
  /**
   * @param params The `PointsService.PointsDeletingCauseListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  pointsDeletingCauseList(params: PointsService.PointsDeletingCauseListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<PointsDeletingCauseList>}> {
    return this.pointsDeletingCauseListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<PointsDeletingCauseList>})
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
   * @param id A unique integer value identifying this سبب حذف.
   */
  pointsDeletingCauseReadResponse(id: number): __Observable<__StrictHttpResponse<PointsDeletingCauseList>> {
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
   * @param id A unique integer value identifying this سبب حذف.
   */
  pointsDeletingCauseRead(id: number): __Observable<PointsDeletingCauseList> {
    return this.pointsDeletingCauseReadResponse(id).pipe(
      __map(_r => _r.body as PointsDeletingCauseList)
    );
  }

  /**
   * @param params The `PointsService.PointsDeletingCauseUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this سبب حذف.
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
   * - `id`: A unique integer value identifying this سبب حذف.
   *
   * - `data`:
   */
  pointsDeletingCauseUpdate(params: PointsService.PointsDeletingCauseUpdateParams): __Observable<PointsDeletingCauseUpdate> {
    return this.pointsDeletingCauseUpdateResponse(params).pipe(
      __map(_r => _r.body as PointsDeletingCauseUpdate)
    );
  }

  /**
   * @param id A unique integer value identifying this سبب حذف.
   */
  pointsDeletingCauseDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
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
   * @param id A unique integer value identifying this سبب حذف.
   */
  pointsDeletingCauseDelete(id: number): __Observable<null> {
    return this.pointsDeletingCauseDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `PointsService.PointsDeletingListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  pointsDeletingListResponse(params: PointsService.PointsDeletingListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PointsDeletingList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
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
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  pointsDeletingList(params: PointsService.PointsDeletingListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<PointsDeletingList>}> {
    return this.pointsDeletingListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<PointsDeletingList>})
    );
  }

  /**
   * @param id A unique integer value identifying this حذف نقاط.
   */
  pointsDeletingReadResponse(id: number): __Observable<__StrictHttpResponse<PointsDeletingList>> {
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
   * @param id A unique integer value identifying this حذف نقاط.
   */
  pointsDeletingRead(id: number): __Observable<PointsDeletingList> {
    return this.pointsDeletingReadResponse(id).pipe(
      __map(_r => _r.body as PointsDeletingList)
    );
  }

  /**
   * @param params The `PointsService.PointsDeletingUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this حذف نقاط.
   *
   * - `data`:
   */
  pointsDeletingUpdateResponse(params: PointsService.PointsDeletingUpdateParams): __Observable<__StrictHttpResponse<PointsDeletingUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/points/deleting/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PointsDeletingUpdate>;
      })
    );
  }
  /**
   * @param params The `PointsService.PointsDeletingUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this حذف نقاط.
   *
   * - `data`:
   */
  pointsDeletingUpdate(params: PointsService.PointsDeletingUpdateParams): __Observable<PointsDeletingUpdate> {
    return this.pointsDeletingUpdateResponse(params).pipe(
      __map(_r => _r.body as PointsDeletingUpdate)
    );
  }

  /**
   * @param id A unique integer value identifying this حذف نقاط.
   */
  pointsDeletingDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
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
   * @param id A unique integer value identifying this حذف نقاط.
   */
  pointsDeletingDelete(id: number): __Observable<null> {
    return this.pointsDeletingDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module PointsService {

  /**
   * Parameters for pointsAddingCauseList
   */
  export interface PointsAddingCauseListParams {

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
   * Parameters for pointsAddingCauseUpdate
   */
  export interface PointsAddingCauseUpdateParams {

    /**
     * A unique integer value identifying this سبب إضافة.
     */
    id: number;
    data: PointsAddingCauseUpdate;
  }

  /**
   * Parameters for pointsAddingList
   */
  export interface PointsAddingListParams {

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
   * Parameters for pointsAddingUpdate
   */
  export interface PointsAddingUpdateParams {

    /**
     * A unique integer value identifying this إضافة نقاط.
     */
    id: number;
    data: PointsAddingUpdate;
  }

  /**
   * Parameters for pointsDeletingCauseList
   */
  export interface PointsDeletingCauseListParams {

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
   * Parameters for pointsDeletingCauseUpdate
   */
  export interface PointsDeletingCauseUpdateParams {

    /**
     * A unique integer value identifying this سبب حذف.
     */
    id: number;
    data: PointsDeletingCauseUpdate;
  }

  /**
   * Parameters for pointsDeletingList
   */
  export interface PointsDeletingListParams {

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
   * Parameters for pointsDeletingUpdate
   */
  export interface PointsDeletingUpdateParams {

    /**
     * A unique integer value identifying this حذف نقاط.
     */
    id: number;
    data: PointsDeletingUpdate;
  }
}

export { PointsService }
