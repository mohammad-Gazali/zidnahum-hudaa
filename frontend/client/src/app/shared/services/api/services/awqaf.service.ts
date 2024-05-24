/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AwqafTestNoQ } from '../models/awqaf-test-no-q';
@Injectable({
  providedIn: 'root',
})
class AwqafService extends __BaseService {
  static readonly awqafTestNoQListPath = '/awqaf/test-no-q';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  awqafTestNoQListResponse(): __Observable<__StrictHttpResponse<Array<AwqafTestNoQ>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/awqaf/test-no-q`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AwqafTestNoQ>>;
      })
    );
  }  
  
  awqafTestNoQList(): __Observable<Array<AwqafTestNoQ>> {
    return this.awqafTestNoQListResponse().pipe(
      __map(_r => _r.body as Array<AwqafTestNoQ>)
    );
  }
}

module AwqafService {
}

export { AwqafService }
