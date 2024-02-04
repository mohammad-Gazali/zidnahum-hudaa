/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AssetFileList } from '../models/asset-file-list';
import { AssetFileCreate } from '../models/asset-file-create';
import { AssetFileUpdate } from '../models/asset-file-update';
import { AssetsCategoryList } from '../models/assets-category-list';
import { AssetsCategoryCreate } from '../models/assets-category-create';
import { AssetsCategoryUpdate } from '../models/assets-category-update';
@Injectable({
  providedIn: 'root',
})
class GlobalsService extends __BaseService {
  static readonly globalsAssetFileListPath = '/globals/asset-file/';
  static readonly globalsAssetFileCreatePath = '/globals/asset-file/';
  static readonly globalsAssetFileReadPath = '/globals/asset-file/{id}/';
  static readonly globalsAssetFileUpdatePath = '/globals/asset-file/{id}/';
  static readonly globalsAssetFileDeletePath = '/globals/asset-file/{id}/';
  static readonly globalsAssetsCategoryListPath = '/globals/assets-category/';
  static readonly globalsAssetsCategoryCreatePath = '/globals/assets-category/';
  static readonly globalsAssetsCategoryReadPath = '/globals/assets-category/{id}/';
  static readonly globalsAssetsCategoryUpdatePath = '/globals/assets-category/{id}/';
  static readonly globalsAssetsCategoryDeletePath = '/globals/assets-category/{id}/';

  /**
   * @param params The `GlobalsService.GlobalsAssetFileListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  globalsAssetFileListResponse(params: GlobalsService.GlobalsAssetFileListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<AssetFileList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/globals/asset-file/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<AssetFileList>}>;
      })
    );
  }
  /**
   * @param params The `GlobalsService.GlobalsAssetFileListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  globalsAssetFileList(params: GlobalsService.GlobalsAssetFileListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<AssetFileList>}> {
    return this.globalsAssetFileListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<AssetFileList>})
    );
  }

  /**
   * @param data undefined
   */
  globalsAssetFileCreateResponse(data: AssetFileCreate): __Observable<__StrictHttpResponse<AssetFileCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/globals/asset-file/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AssetFileCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  globalsAssetFileCreate(data: AssetFileCreate): __Observable<AssetFileCreate> {
    return this.globalsAssetFileCreateResponse(data).pipe(
      __map(_r => _r.body as AssetFileCreate)
    );
  }

  /**
   * @param id A unique integer value identifying this ملف للتحميل.
   */
  globalsAssetFileReadResponse(id: number): __Observable<__StrictHttpResponse<AssetFileList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/globals/asset-file/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AssetFileList>;
      })
    );
  }
  /**
   * @param id A unique integer value identifying this ملف للتحميل.
   */
  globalsAssetFileRead(id: number): __Observable<AssetFileList> {
    return this.globalsAssetFileReadResponse(id).pipe(
      __map(_r => _r.body as AssetFileList)
    );
  }

  /**
   * @param params The `GlobalsService.GlobalsAssetFileUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this ملف للتحميل.
   *
   * - `data`:
   */
  globalsAssetFileUpdateResponse(params: GlobalsService.GlobalsAssetFileUpdateParams): __Observable<__StrictHttpResponse<AssetFileUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/globals/asset-file/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AssetFileUpdate>;
      })
    );
  }
  /**
   * @param params The `GlobalsService.GlobalsAssetFileUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this ملف للتحميل.
   *
   * - `data`:
   */
  globalsAssetFileUpdate(params: GlobalsService.GlobalsAssetFileUpdateParams): __Observable<AssetFileUpdate> {
    return this.globalsAssetFileUpdateResponse(params).pipe(
      __map(_r => _r.body as AssetFileUpdate)
    );
  }

  /**
   * @param id A unique integer value identifying this ملف للتحميل.
   */
  globalsAssetFileDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/globals/asset-file/${encodeURIComponent(String(id))}/`,
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
   * @param id A unique integer value identifying this ملف للتحميل.
   */
  globalsAssetFileDelete(id: number): __Observable<null> {
    return this.globalsAssetFileDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `GlobalsService.GlobalsAssetsCategoryListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  globalsAssetsCategoryListResponse(params: GlobalsService.GlobalsAssetsCategoryListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<AssetsCategoryList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/globals/assets-category/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<AssetsCategoryList>}>;
      })
    );
  }
  /**
   * @param params The `GlobalsService.GlobalsAssetsCategoryListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  globalsAssetsCategoryList(params: GlobalsService.GlobalsAssetsCategoryListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<AssetsCategoryList>}> {
    return this.globalsAssetsCategoryListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<AssetsCategoryList>})
    );
  }

  /**
   * @param data undefined
   */
  globalsAssetsCategoryCreateResponse(data: AssetsCategoryCreate): __Observable<__StrictHttpResponse<AssetsCategoryCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/globals/assets-category/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AssetsCategoryCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  globalsAssetsCategoryCreate(data: AssetsCategoryCreate): __Observable<AssetsCategoryCreate> {
    return this.globalsAssetsCategoryCreateResponse(data).pipe(
      __map(_r => _r.body as AssetsCategoryCreate)
    );
  }

  /**
   * @param id A unique integer value identifying this فئة ملفات.
   */
  globalsAssetsCategoryReadResponse(id: number): __Observable<__StrictHttpResponse<AssetsCategoryList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/globals/assets-category/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AssetsCategoryList>;
      })
    );
  }
  /**
   * @param id A unique integer value identifying this فئة ملفات.
   */
  globalsAssetsCategoryRead(id: number): __Observable<AssetsCategoryList> {
    return this.globalsAssetsCategoryReadResponse(id).pipe(
      __map(_r => _r.body as AssetsCategoryList)
    );
  }

  /**
   * @param params The `GlobalsService.GlobalsAssetsCategoryUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this فئة ملفات.
   *
   * - `data`:
   */
  globalsAssetsCategoryUpdateResponse(params: GlobalsService.GlobalsAssetsCategoryUpdateParams): __Observable<__StrictHttpResponse<AssetsCategoryUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/globals/assets-category/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AssetsCategoryUpdate>;
      })
    );
  }
  /**
   * @param params The `GlobalsService.GlobalsAssetsCategoryUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this فئة ملفات.
   *
   * - `data`:
   */
  globalsAssetsCategoryUpdate(params: GlobalsService.GlobalsAssetsCategoryUpdateParams): __Observable<AssetsCategoryUpdate> {
    return this.globalsAssetsCategoryUpdateResponse(params).pipe(
      __map(_r => _r.body as AssetsCategoryUpdate)
    );
  }

  /**
   * @param id A unique integer value identifying this فئة ملفات.
   */
  globalsAssetsCategoryDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/globals/assets-category/${encodeURIComponent(String(id))}/`,
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
   * @param id A unique integer value identifying this فئة ملفات.
   */
  globalsAssetsCategoryDelete(id: number): __Observable<null> {
    return this.globalsAssetsCategoryDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module GlobalsService {

  /**
   * Parameters for globalsAssetFileList
   */
  export interface GlobalsAssetFileListParams {

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
  }

  /**
   * Parameters for globalsAssetFileUpdate
   */
  export interface GlobalsAssetFileUpdateParams {

    /**
     * A unique integer value identifying this ملف للتحميل.
     */
    id: number;
    data: AssetFileUpdate;
  }

  /**
   * Parameters for globalsAssetsCategoryList
   */
  export interface GlobalsAssetsCategoryListParams {

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
  }

  /**
   * Parameters for globalsAssetsCategoryUpdate
   */
  export interface GlobalsAssetsCategoryUpdateParams {

    /**
     * A unique integer value identifying this فئة ملفات.
     */
    id: number;
    data: AssetsCategoryUpdate;
  }
}

export { GlobalsService }
