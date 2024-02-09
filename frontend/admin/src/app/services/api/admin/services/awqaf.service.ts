/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AwqafNoQStudentRelationList } from '../models/awqaf-no-qstudent-relation-list';
import { AwqafNoQStudentRelationCreate } from '../models/awqaf-no-qstudent-relation-create';
import { AwqafNoQStudentRelationUpdate } from '../models/awqaf-no-qstudent-relation-update';
import { AwqafTestNoQList } from '../models/awqaf-test-no-qlist';
import { AwqafTestNoQCreate } from '../models/awqaf-test-no-qcreate';
import { AwqafTestNoQUpdate } from '../models/awqaf-test-no-qupdate';
@Injectable({
  providedIn: 'root',
})
class AwqafService extends __BaseService {
  static readonly awqafStudentNoQRelationListPath = '/awqaf/student-no-q-relation/';
  static readonly awqafStudentNoQRelationCreatePath = '/awqaf/student-no-q-relation/';
  static readonly awqafStudentNoQRelationReadPath = '/awqaf/student-no-q-relation/{id}/';
  static readonly awqafStudentNoQRelationUpdatePath = '/awqaf/student-no-q-relation/{id}/';
  static readonly awqafStudentNoQRelationDeletePath = '/awqaf/student-no-q-relation/{id}/';
  static readonly awqafTestNoQListPath = '/awqaf/test-no-q/';
  static readonly awqafTestNoQCreatePath = '/awqaf/test-no-q/';
  static readonly awqafTestNoQReadPath = '/awqaf/test-no-q/{id}/';
  static readonly awqafTestNoQUpdatePath = '/awqaf/test-no-q/{id}/';
  static readonly awqafTestNoQDeletePath = '/awqaf/test-no-q/{id}/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `AwqafService.AwqafStudentNoQRelationListParams` containing the following parameters:
   *
   * - `test`: test
   *
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   *
   * - `is_old`: is_old
   */
  awqafStudentNoQRelationListResponse(params: AwqafService.AwqafStudentNoQRelationListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<AwqafNoQStudentRelationList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.test != null) __params = __params.set('test', params.test.toString());
    if (params.studentName != null) __params = __params.set('student__name', params.studentName.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.isOld != null) __params = __params.set('is_old', params.isOld.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/awqaf/student-no-q-relation/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<AwqafNoQStudentRelationList>}>;
      })
    );
  }
  /**
   * @param params The `AwqafService.AwqafStudentNoQRelationListParams` containing the following parameters:
   *
   * - `test`: test
   *
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   *
   * - `is_old`: is_old
   */
  awqafStudentNoQRelationList(params: AwqafService.AwqafStudentNoQRelationListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<AwqafNoQStudentRelationList>}> {
    return this.awqafStudentNoQRelationListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<AwqafNoQStudentRelationList>})
    );
  }

  /**
   * @param data undefined
   */
  awqafStudentNoQRelationCreateResponse(data: AwqafNoQStudentRelationCreate): __Observable<__StrictHttpResponse<AwqafNoQStudentRelationCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/awqaf/student-no-q-relation/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AwqafNoQStudentRelationCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  awqafStudentNoQRelationCreate(data: AwqafNoQStudentRelationCreate): __Observable<AwqafNoQStudentRelationCreate> {
    return this.awqafStudentNoQRelationCreateResponse(data).pipe(
      __map(_r => _r.body as AwqafNoQStudentRelationCreate)
    );
  }

  /**
   * @param id undefined
   */
  awqafStudentNoQRelationReadResponse(id: string): __Observable<__StrictHttpResponse<AwqafNoQStudentRelationList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/awqaf/student-no-q-relation/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AwqafNoQStudentRelationList>;
      })
    );
  }
  /**
   * @param id undefined
   */
  awqafStudentNoQRelationRead(id: string): __Observable<AwqafNoQStudentRelationList> {
    return this.awqafStudentNoQRelationReadResponse(id).pipe(
      __map(_r => _r.body as AwqafNoQStudentRelationList)
    );
  }

  /**
   * @param params The `AwqafService.AwqafStudentNoQRelationUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  awqafStudentNoQRelationUpdateResponse(params: AwqafService.AwqafStudentNoQRelationUpdateParams): __Observable<__StrictHttpResponse<AwqafNoQStudentRelationUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/awqaf/student-no-q-relation/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AwqafNoQStudentRelationUpdate>;
      })
    );
  }
  /**
   * @param params The `AwqafService.AwqafStudentNoQRelationUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  awqafStudentNoQRelationUpdate(params: AwqafService.AwqafStudentNoQRelationUpdateParams): __Observable<AwqafNoQStudentRelationUpdate> {
    return this.awqafStudentNoQRelationUpdateResponse(params).pipe(
      __map(_r => _r.body as AwqafNoQStudentRelationUpdate)
    );
  }

  /**
   * @param id undefined
   */
  awqafStudentNoQRelationDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/awqaf/student-no-q-relation/${encodeURIComponent(String(id))}/`,
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
  awqafStudentNoQRelationDelete(id: string): __Observable<null> {
    return this.awqafStudentNoQRelationDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param ordering Which field to use when ordering the results.
   */
  awqafTestNoQListResponse(ordering?: string): __Observable<__StrictHttpResponse<Array<AwqafTestNoQList>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (ordering != null) __params = __params.set('ordering', ordering.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/awqaf/test-no-q/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AwqafTestNoQList>>;
      })
    );
  }
  /**
   * @param ordering Which field to use when ordering the results.
   */
  awqafTestNoQList(ordering?: string): __Observable<Array<AwqafTestNoQList>> {
    return this.awqafTestNoQListResponse(ordering).pipe(
      __map(_r => _r.body as Array<AwqafTestNoQList>)
    );
  }

  /**
   * @param data undefined
   */
  awqafTestNoQCreateResponse(data: AwqafTestNoQCreate): __Observable<__StrictHttpResponse<AwqafTestNoQCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/awqaf/test-no-q/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AwqafTestNoQCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  awqafTestNoQCreate(data: AwqafTestNoQCreate): __Observable<AwqafTestNoQCreate> {
    return this.awqafTestNoQCreateResponse(data).pipe(
      __map(_r => _r.body as AwqafTestNoQCreate)
    );
  }

  /**
   * @param id undefined
   */
  awqafTestNoQReadResponse(id: string): __Observable<__StrictHttpResponse<AwqafTestNoQList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/awqaf/test-no-q/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AwqafTestNoQList>;
      })
    );
  }
  /**
   * @param id undefined
   */
  awqafTestNoQRead(id: string): __Observable<AwqafTestNoQList> {
    return this.awqafTestNoQReadResponse(id).pipe(
      __map(_r => _r.body as AwqafTestNoQList)
    );
  }

  /**
   * @param params The `AwqafService.AwqafTestNoQUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  awqafTestNoQUpdateResponse(params: AwqafService.AwqafTestNoQUpdateParams): __Observable<__StrictHttpResponse<AwqafTestNoQUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/awqaf/test-no-q/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AwqafTestNoQUpdate>;
      })
    );
  }
  /**
   * @param params The `AwqafService.AwqafTestNoQUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  awqafTestNoQUpdate(params: AwqafService.AwqafTestNoQUpdateParams): __Observable<AwqafTestNoQUpdate> {
    return this.awqafTestNoQUpdateResponse(params).pipe(
      __map(_r => _r.body as AwqafTestNoQUpdate)
    );
  }

  /**
   * @param id undefined
   */
  awqafTestNoQDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/awqaf/test-no-q/${encodeURIComponent(String(id))}/`,
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
  awqafTestNoQDelete(id: string): __Observable<null> {
    return this.awqafTestNoQDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module AwqafService {

  /**
   * Parameters for awqafStudentNoQRelationList
   */
  export interface AwqafStudentNoQRelationListParams {

    /**
     * test
     */
    test?: string;

    /**
     * param for filtering result via student name or student id
     */
    studentName?: string;

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
     * is_old
     */
    isOld?: string;
  }

  /**
   * Parameters for awqafStudentNoQRelationUpdate
   */
  export interface AwqafStudentNoQRelationUpdateParams {
    id: string;
    data: AwqafNoQStudentRelationUpdate;
  }

  /**
   * Parameters for awqafTestNoQUpdate
   */
  export interface AwqafTestNoQUpdateParams {
    id: string;
    data: AwqafTestNoQUpdate;
  }
}

export { AwqafService }
