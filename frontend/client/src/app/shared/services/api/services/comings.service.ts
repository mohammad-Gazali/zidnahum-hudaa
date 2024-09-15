/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable, map as __map, filter as __filter } from 'rxjs';

import { ComingList } from '../models/coming-list';
import { ComingCreate } from '../models/coming-create';
import { ComingCategory } from '../models/coming-category';
@Injectable({
  providedIn: 'root',
})
class ComingsService extends __BaseService {
  static readonly comingsListPath = '/comings/';
  static readonly comingsCreatePath = '/comings/';
  static readonly comingsCategoryListPath = '/comings/category';
  static readonly comingsDeletePath = '/comings/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param page A page number within the paginated result set.
   */
  comingsListResponse(page?: number): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ComingList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/comings/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ComingList>}>;
      })
    );
  }
  /**
   * @param page A page number within the paginated result set.
   */
  comingsList(page?: number): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ComingList>}> {
    return this.comingsListResponse(page).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<ComingList>})
    );
  }

  /**
   * @param data undefined
   */
  comingsCreateResponse(data: ComingCreate): __Observable<__StrictHttpResponse<ComingCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/comings/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ComingCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  comingsCreate(data: ComingCreate): __Observable<ComingCreate> {
    return this.comingsCreateResponse(data).pipe(
      __map(_r => _r.body as ComingCreate)
    );
  }
  comingsCategoryListResponse(): __Observable<__StrictHttpResponse<Array<ComingCategory>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/comings/category`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ComingCategory>>;
      })
    );
  }  comingsCategoryList(): __Observable<Array<ComingCategory>> {
    return this.comingsCategoryListResponse().pipe(
      __map(_r => _r.body as Array<ComingCategory>)
    );
  }

  /**
   * @param id A unique integer value identifying this تسجيل حضور.
   */
  comingsDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/comings/${encodeURIComponent(String(id))}`,
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
   * @param id A unique integer value identifying this تسجيل حضور.
   */
  comingsDelete(id: number): __Observable<null> {
    return this.comingsDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ComingsService {
}

export { ComingsService }
