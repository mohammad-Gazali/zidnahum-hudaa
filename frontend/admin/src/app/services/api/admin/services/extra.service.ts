/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AddAwqafTestNoQRequestSerailizer } from '../models/add-awqaf-test-no-qrequest-serailizer';
import { AddAwqafTestQRequest } from '../models/add-awqaf-test-qrequest';
import { AddMoneyDeletingCategoryRequestSerailizer } from '../models/add-money-deleting-category-request-serailizer';
import { AddMoneyDeletingNormalRequestSerailizer } from '../models/add-money-deleting-normal-request-serailizer';
import { ControlSettings } from '../models/control-settings';
import { StatisticsResponse } from '../models/statistics-response';
import { StatisticsRequest } from '../models/statistics-request';
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
  }  extraControlSettingsList(): __Observable<ControlSettings> {
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
}

module ExtraService {
}

export { ExtraService }
