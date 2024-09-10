/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { filter as __filter, map as __map } from 'rxjs/operators';

import { AddAwqafTestNoQRequestSerailizer } from '../models/add-awqaf-test-no-qrequest-serailizer';
import { AddAwqafTestQRequest } from '../models/add-awqaf-test-qrequest';
import { AddMoneyDeletingCategoryRequestSerailizer } from '../models/add-money-deleting-category-request-serailizer';
import { AddMoneyDeletingNormalRequestSerailizer } from '../models/add-money-deleting-normal-request-serailizer';
import { ControlSettings } from '../models/control-settings';
import { StatisticsResponse } from '../models/statistics-response';
import { StatisticsRequest } from '../models/statistics-request';
import { MoneyTotal } from '../models/money-total';

@Injectable({
  providedIn: 'root',
})
class ExtraService extends __BaseService {
  static readonly extraAddAwqafNoQTestCreatePath = '/extra/add-awqaf-no-q-test';
  static readonly extraAddAwqafQTestCreatePath = '/extra/add-awqaf-q-test';
  static readonly extraAddMoneyDeletingCategoryCreatePath = '/extra/add-money-deleting-category';
  static readonly extraAddMoneyDeletingNormalCreatePath = '/extra/add-money-deleting-normal';
  static readonly extraControlSettingsListPath = '/extra/control-settings';
  static readonly extraControlSettingsUpdatePath = '/extra/control-settings';
  static readonly extraStatisticsCreatePath = '/extra/statistics';
  static readonly extraMoneyTotalListPath = '/extra/total-money';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param data undefined
   */
  extraAddAwqafNoQTestCreateResponse(data: AddAwqafTestNoQRequestSerailizer): __Observable<__StrictHttpResponse<AddAwqafTestNoQRequestSerailizer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/extra/add-awqaf-no-q-test`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AddAwqafTestNoQRequestSerailizer>;
      })
    );
  }

  /**
   * @param data undefined
   */
  extraAddAwqafNoQTestCreate(data: AddAwqafTestNoQRequestSerailizer): __Observable<AddAwqafTestNoQRequestSerailizer> {
    return this.extraAddAwqafNoQTestCreateResponse(data).pipe(
      __map(_r => _r.body as AddAwqafTestNoQRequestSerailizer)
    );
  }

  /**
   * @param data undefined
   */
  extraAddAwqafQTestCreateResponse(data: AddAwqafTestQRequest): __Observable<__StrictHttpResponse<AddAwqafTestQRequest>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/extra/add-awqaf-q-test`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AddAwqafTestQRequest>;
      })
    );
  }

  /**
   * @param data undefined
   */
  extraAddAwqafQTestCreate(data: AddAwqafTestQRequest): __Observable<AddAwqafTestQRequest> {
    return this.extraAddAwqafQTestCreateResponse(data).pipe(
      __map(_r => _r.body as AddAwqafTestQRequest)
    );
  }

  /**
   * @param data undefined
   */
  extraAddMoneyDeletingCategoryCreateResponse(data: AddMoneyDeletingCategoryRequestSerailizer): __Observable<__StrictHttpResponse<AddMoneyDeletingCategoryRequestSerailizer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/extra/add-money-deleting-category`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AddMoneyDeletingCategoryRequestSerailizer>;
      })
    );
  }

  /**
   * @param data undefined
   */
  extraAddMoneyDeletingCategoryCreate(data: AddMoneyDeletingCategoryRequestSerailizer): __Observable<AddMoneyDeletingCategoryRequestSerailizer> {
    return this.extraAddMoneyDeletingCategoryCreateResponse(data).pipe(
      __map(_r => _r.body as AddMoneyDeletingCategoryRequestSerailizer)
    );
  }

  /**
   * @param data undefined
   */
  extraAddMoneyDeletingNormalCreateResponse(data: AddMoneyDeletingNormalRequestSerailizer): __Observable<__StrictHttpResponse<AddMoneyDeletingNormalRequestSerailizer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/extra/add-money-deleting-normal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AddMoneyDeletingNormalRequestSerailizer>;
      })
    );
  }

  /**
   * @param data undefined
   */
  extraAddMoneyDeletingNormalCreate(data: AddMoneyDeletingNormalRequestSerailizer): __Observable<AddMoneyDeletingNormalRequestSerailizer> {
    return this.extraAddMoneyDeletingNormalCreateResponse(data).pipe(
      __map(_r => _r.body as AddMoneyDeletingNormalRequestSerailizer)
    );
  }

  extraControlSettingsListResponse(): __Observable<__StrictHttpResponse<ControlSettings>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/extra/control-settings`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ControlSettings>;
      })
    );
  }

  extraControlSettingsList(): __Observable<ControlSettings> {
    return this.extraControlSettingsListResponse().pipe(
      __map(_r => _r.body as ControlSettings)
    );
  }

  /**
   * @param data undefined
   */
  extraControlSettingsUpdateResponse(data: ControlSettings): __Observable<__StrictHttpResponse<ControlSettings>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/extra/control-settings`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ControlSettings>;
      })
    );
  }

  /**
   * @param data undefined
   */
  extraControlSettingsUpdate(data: ControlSettings): __Observable<ControlSettings> {
    return this.extraControlSettingsUpdateResponse(data).pipe(
      __map(_r => _r.body as ControlSettings)
    );
  }

  /**
   * @param data undefined
   */
  extraStatisticsCreateResponse(data: StatisticsRequest): __Observable<__StrictHttpResponse<StatisticsResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/extra/statistics`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StatisticsResponse>;
      })
    );
  }

  /**
   * @param data undefined
   */
  extraStatisticsCreate(data: StatisticsRequest): __Observable<StatisticsResponse> {
    return this.extraStatisticsCreateResponse(data).pipe(
      __map(_r => _r.body as StatisticsResponse)
    );
  }

  /**
   * @param params The `ExtraService.MoneyTotalParams` containing the following parameters:
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
   */
  extraMoneyTotalListResponse(params: ExtraService.MoneyTotalListParams): __Observable<__StrictHttpResponse<{
    count: number,
    next?: null | string,
    previous?: null | string,
    results: Array<MoneyTotal>
  }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.studentName != null) __params = __params.set('student__name', params.studentName.toString());
    if (params.studentMasjed != null) __params = __params.set('student__masjed', params.studentMasjed.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/extra/total-money`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{
          count: number,
          next?: null | string,
          previous?: null | string,
          results: Array<MoneyTotal>
        }>;
      })
    );
  }

  /**
   * @param params The `ExtraService.MoneyTotalParams` containing the following parameters:
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
   */
  extraMoneyTotalList(params: ExtraService.MoneyTotalListParams): __Observable<{
    count: number,
    next?: null | string,
    previous?: null | string,
    results: Array<MoneyTotal>
  }> {
    return this.extraMoneyTotalListResponse(params).pipe(
      __map(_r => _r.body as {
        count: number,
        next?: null | string,
        previous?: null | string,
        results: Array<MoneyTotal>
      })
    );
  }
}

module ExtraService {
  export interface MoneyTotalListParams {
    /**
     * param for filtering result via student name or student id
     */
    studentName?: string;

    /**
     * student__masjed
     */
    studentMasjed?: '1' | '2' | '3';

    /**
     * The initial index from which to return the results.
     */
    offset?: number;

    /**
     * Number of results to return per page.
     */
    limit?: number;

    /**
     * Which field to use when ordering the results.
     */
    ordering?: string;
  }
}

export { ExtraService };
