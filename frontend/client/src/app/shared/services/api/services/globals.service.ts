/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable, map as __map, filter as __filter } from 'rxjs';

import { AssetCategory } from '../models/asset-category';
@Injectable({
  providedIn: 'root',
})
class GlobalsService extends __BaseService {
  static readonly globalsAssetListPath = '/globals/asset';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  globalsAssetListResponse(): __Observable<__StrictHttpResponse<Array<AssetCategory>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/globals/asset`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AssetCategory>>;
      })
    );
  }  globalsAssetList(): __Observable<Array<AssetCategory>> {
    return this.globalsAssetListResponse().pipe(
      __map(_r => _r.body as Array<AssetCategory>)
    );
  }
}

module GlobalsService {
}

export { GlobalsService }
