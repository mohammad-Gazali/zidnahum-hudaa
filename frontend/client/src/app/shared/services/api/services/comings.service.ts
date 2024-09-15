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
   * @param params The `ComingsService.ComingsListParams` containing the following parameters:
   *
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `student__masjed`: student__masjed
   *
   * - `registered_at__lt`: registered_at__lt
   *
   * - `registered_at__gt`: registered_at__gt
   *
   * - `page`: A page number within the paginated result set.
   */
  comingsListResponse(params: ComingsService.ComingsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<ComingList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.studentName != null) __params = __params.set('student__name', params.studentName.toString());
    if (params.studentMasjed != null) __params = __params.set('student__masjed', params.studentMasjed.toString());
    if (params.registeredAtLt != null) __params = __params.set('registered_at__lt', params.registeredAtLt.toString());
    if (params.registeredAtGt != null) __params = __params.set('registered_at__gt', params.registeredAtGt.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.category != null) __params = __params.set('category', params.category.toString());

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
   * @param params The `ComingsService.ComingsListParams` containing the following parameters:
   *
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `student__masjed`: student__masjed
   *
   * - `registered_at__lt`: registered_at__lt
   *
   * - `registered_at__gt`: registered_at__gt
   *
   * - `page`: A page number within the paginated result set.
   */
  comingsList(params: ComingsService.ComingsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<ComingList>}> {
    return this.comingsListResponse(params).pipe(
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
  export interface ComingsListParams {
    /**
     * param for filtering result via student name or student id
     */
    studentName?: string;

    /**
     * student__masjed
     */
    studentMasjed?: '1' | '2' | '3';

    /**
     * registered_at__lt
     */
    registeredAtLt?: string;

    /**
     * registered_at__gt
     */
    registeredAtGt?: string;

    /**
     * category
     */
    category?: string;

    /**
     * A page number within the paginated result set.
     */
    page?: number;
  }
}

export { ComingsService }
