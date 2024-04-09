/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ReportsStudentCategoryOrGroupResponse } from '../models/reports-student-category-or-group-response';
import { ReportsRequestWithMasjed } from '../models/reports-request-with-masjed';
import { ReportsStudentResponse } from '../models/reports-student-response';
import { ReportsRequest } from '../models/reports-request';
@Injectable({
  providedIn: 'root',
})
class ReportsService extends __BaseService {
  static readonly reportsCategoryCreatePath = '/reports/category/{id}';
  static readonly reportsGroupCreatePath = '/reports/group/{id}';
  static readonly reportsStudentCreatePath = '/reports/student/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `ReportsService.ReportsCategoryCreateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   *
   * - `excel`: param for determining if the response is excel file or not
   */
  reportsCategoryCreateResponse(params: ReportsService.ReportsCategoryCreateParams): __Observable<__StrictHttpResponse<ReportsStudentCategoryOrGroupResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    if (params.excel != null) __params = __params.set('excel', params.excel.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/reports/category/${encodeURIComponent(String(params.id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReportsStudentCategoryOrGroupResponse>;
      })
    );
  }
  /**
   * @param params The `ReportsService.ReportsCategoryCreateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   *
   * - `excel`: param for determining if the response is excel file or not
   */
  reportsCategoryCreate(params: ReportsService.ReportsCategoryCreateParams): __Observable<ReportsStudentCategoryOrGroupResponse> {
    return this.reportsCategoryCreateResponse(params).pipe(
      __map(_r => _r.body as ReportsStudentCategoryOrGroupResponse)
    );
  }

  /**
   * @param params The `ReportsService.ReportsGroupCreateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   *
   * - `excel`: param for determining if the response is excel file or not
   */
  reportsGroupCreateResponse(params: ReportsService.ReportsGroupCreateParams): __Observable<__StrictHttpResponse<ReportsStudentCategoryOrGroupResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    if (params.excel != null) __params = __params.set('excel', params.excel.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/reports/group/${encodeURIComponent(String(params.id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReportsStudentCategoryOrGroupResponse>;
      })
    );
  }
  /**
   * @param params The `ReportsService.ReportsGroupCreateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   *
   * - `excel`: param for determining if the response is excel file or not
   */
  reportsGroupCreate(params: ReportsService.ReportsGroupCreateParams): __Observable<ReportsStudentCategoryOrGroupResponse> {
    return this.reportsGroupCreateResponse(params).pipe(
      __map(_r => _r.body as ReportsStudentCategoryOrGroupResponse)
    );
  }

  /**
   * @param params The `ReportsService.ReportsStudentCreateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   *
   * - `excel`: param for determining if the response is excel file or not
   */
  reportsStudentCreateResponse(params: ReportsService.ReportsStudentCreateParams): __Observable<__StrictHttpResponse<ReportsStudentResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    if (params.excel != null) __params = __params.set('excel', params.excel.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/reports/student/${encodeURIComponent(String(params.id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReportsStudentResponse>;
      })
    );
  }
  /**
   * @param params The `ReportsService.ReportsStudentCreateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   *
   * - `excel`: param for determining if the response is excel file or not
   */
  reportsStudentCreate(params: ReportsService.ReportsStudentCreateParams): __Observable<ReportsStudentResponse> {
    return this.reportsStudentCreateResponse(params).pipe(
      __map(_r => _r.body as ReportsStudentResponse)
    );
  }
}

module ReportsService {

  /**
   * Parameters for reportsCategoryCreate
   */
  export interface ReportsCategoryCreateParams {
    id: string;
    data: ReportsRequestWithMasjed;

    /**
     * param for determining if the response is excel file or not
     */
    excel?: boolean;
  }

  /**
   * Parameters for reportsGroupCreate
   */
  export interface ReportsGroupCreateParams {
    id: string;
    data: ReportsRequestWithMasjed;

    /**
     * param for determining if the response is excel file or not
     */
    excel?: boolean;
  }

  /**
   * Parameters for reportsStudentCreate
   */
  export interface ReportsStudentCreateParams {
    id: string;
    data: ReportsRequest;

    /**
     * param for determining if the response is excel file or not
     */
    excel?: boolean;
  }
}

export { ReportsService }
