/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PointsAddingList } from '../models/points-adding-list';
import { PointsAddingCreate } from '../models/points-adding-create';
import { PointsAddingCause } from '../models/points-adding-cause';
import { PointsDeletingList } from '../models/points-deleting-list';
import { PointsDeletingCreate } from '../models/points-deleting-create';
import { PointsDeletingCause } from '../models/points-deleting-cause';
@Injectable({
  providedIn: 'root',
})
class PointsService extends __BaseService {
  static readonly pointsAddingListPath = '/points/adding';
  static readonly pointsAddingCreatePath = '/points/adding';
  static readonly pointsAddingCauseListPath = '/points/adding/cause';
  static readonly pointsAddingDeletePath = '/points/adding/{id}';
  static readonly pointsDeletingListPath = '/points/deleting';
  static readonly pointsDeletingCreatePath = '/points/deleting';
  static readonly pointsDeletingCauseListPath = '/points/deleting/cause';
  static readonly pointsDeletingDeletePath = '/points/deleting/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param page A page number within the paginated result set.
   */
  pointsAddingListResponse(page?: number): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PointsAddingList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/points/adding`,
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
   * @param page A page number within the paginated result set.
   */
  pointsAddingList(page?: number): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<PointsAddingList>}> {
    return this.pointsAddingListResponse(page).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<PointsAddingList>})
    );
  }

  /**
   * @param data undefined
   */
  pointsAddingCreateResponse(data: PointsAddingCreate): __Observable<__StrictHttpResponse<PointsAddingCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/points/adding`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PointsAddingCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  pointsAddingCreate(data: PointsAddingCreate): __Observable<PointsAddingCreate> {
    return this.pointsAddingCreateResponse(data).pipe(
      __map(_r => _r.body as PointsAddingCreate)
    );
  }
  pointsAddingCauseListResponse(): __Observable<__StrictHttpResponse<Array<PointsAddingCause>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/points/adding/cause`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PointsAddingCause>>;
      })
    );
  }  pointsAddingCauseList(): __Observable<Array<PointsAddingCause>> {
    return this.pointsAddingCauseListResponse().pipe(
      __map(_r => _r.body as Array<PointsAddingCause>)
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
      this.rootUrl + `/points/adding/${encodeURIComponent(String(id))}`,
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
   * @param page A page number within the paginated result set.
   */
  pointsDeletingListResponse(page?: number): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<PointsDeletingList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/points/deleting`,
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
   * @param page A page number within the paginated result set.
   */
  pointsDeletingList(page?: number): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<PointsDeletingList>}> {
    return this.pointsDeletingListResponse(page).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<PointsDeletingList>})
    );
  }

  /**
   * @param data undefined
   */
  pointsDeletingCreateResponse(data: PointsDeletingCreate): __Observable<__StrictHttpResponse<PointsDeletingCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/points/deleting`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PointsDeletingCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  pointsDeletingCreate(data: PointsDeletingCreate): __Observable<PointsDeletingCreate> {
    return this.pointsDeletingCreateResponse(data).pipe(
      __map(_r => _r.body as PointsDeletingCreate)
    );
  }
  pointsDeletingCauseListResponse(): __Observable<__StrictHttpResponse<Array<PointsDeletingCause>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/points/deleting/cause`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PointsDeletingCause>>;
      })
    );
  }  pointsDeletingCauseList(): __Observable<Array<PointsDeletingCause>> {
    return this.pointsDeletingCauseListResponse().pipe(
      __map(_r => _r.body as Array<PointsDeletingCause>)
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
      this.rootUrl + `/points/deleting/${encodeURIComponent(String(id))}`,
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
}

export { PointsService }
