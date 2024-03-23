/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AddAwqafTestNoQRequestSerailizer } from '../models/add-awqaf-test-no-qrequest-serailizer';
@Injectable({
  providedIn: 'root',
})
class ExtraService extends __BaseService {
  static readonly extraAddAwqafNoQTestCreatePath = '/extra/add-awqaf-no-q-test';

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
}

module ExtraService {
}

export { ExtraService }
