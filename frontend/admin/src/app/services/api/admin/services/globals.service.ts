/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AssetFileList } from '../models/asset-file-list';
import { AssetFileCreate } from '../models/asset-file-create';
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
  static readonly globalsAssetFileDeletePath = '/globals/asset-file/{id}/';
  static readonly globalsAssetsCategoryListPath = '/globals/assets-category/';
  static readonly globalsAssetsCategoryCreatePath = '/globals/assets-category/';
  static readonly globalsAssetsCategoryReadPath = '/globals/assets-category/{id}/';
  static readonly globalsAssetsCategoryUpdatePath = '/globals/assets-category/{id}/';
  static readonly globalsAssetsCategoryDeletePath = '/globals/assets-category/{id}/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `GlobalsService.GlobalsAssetFileListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   *
   * - `category`: category
   */
  globalsAssetFileListResponse(params: GlobalsService.GlobalsAssetFileListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<AssetFileList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.category != null) __params = __params.set('category', params.category.toString());
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
   *
   * - `category`: category
   */
  globalsAssetFileList(params: GlobalsService.GlobalsAssetFileListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<AssetFileList>}> {
    return this.globalsAssetFileListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<AssetFileList>})
    );
  }

  /**
   * @param params The `GlobalsService.GlobalsAssetFileCreateParams` containing the following parameters:
   *
   * - `name`:
   *
   * - `file`:
   *
   * - `category`:
   */
  globalsAssetFileCreateResponse(params: GlobalsService.GlobalsAssetFileCreateParams): __Observable<__StrictHttpResponse<AssetFileCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;
    if (params.name != null) { __formData.append('name', params.name as string | Blob);}
    if (params.file != null) { __formData.append('file', params.file as string | Blob);}
    if (params.category != null) { __formData.append('category', JSON.stringify(params.category));}
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
   * @param params The `GlobalsService.GlobalsAssetFileCreateParams` containing the following parameters:
   *
   * - `name`:
   *
   * - `file`:
   *
   * - `category`:
   */
  globalsAssetFileCreate(params: GlobalsService.GlobalsAssetFileCreateParams): __Observable<AssetFileCreate> {
    return this.globalsAssetFileCreateResponse(params).pipe(
      __map(_r => _r.body as AssetFileCreate)
    );
  }

  /**
   * @param id undefined
   */
  globalsAssetFileReadResponse(id: string): __Observable<__StrictHttpResponse<AssetFileList>> {
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
   * @param id undefined
   */
  globalsAssetFileRead(id: string): __Observable<AssetFileList> {
    return this.globalsAssetFileReadResponse(id).pipe(
      __map(_r => _r.body as AssetFileList)
    );
  }

  /**
   * @param id undefined
   */
  globalsAssetFileDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
   * @param id undefined
   */
  globalsAssetFileDelete(id: string): __Observable<null> {
    return this.globalsAssetFileDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param ordering Which field to use when ordering the results.
   */
  globalsAssetsCategoryListResponse(ordering?: string): __Observable<__StrictHttpResponse<Array<AssetsCategoryList>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (ordering != null) __params = __params.set('ordering', ordering.toString());
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
        return _r as __StrictHttpResponse<Array<AssetsCategoryList>>;
      })
    );
  }
  /**
   * @param ordering Which field to use when ordering the results.
   */
  globalsAssetsCategoryList(ordering?: string): __Observable<Array<AssetsCategoryList>> {
    return this.globalsAssetsCategoryListResponse(ordering).pipe(
      __map(_r => _r.body as Array<AssetsCategoryList>)
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
   * @param id undefined
   */
  globalsAssetsCategoryReadResponse(id: string): __Observable<__StrictHttpResponse<AssetsCategoryList>> {
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
   * @param id undefined
   */
  globalsAssetsCategoryRead(id: string): __Observable<AssetsCategoryList> {
    return this.globalsAssetsCategoryReadResponse(id).pipe(
      __map(_r => _r.body as AssetsCategoryList)
    );
  }

  /**
   * @param params The `GlobalsService.GlobalsAssetsCategoryUpdateParams` containing the following parameters:
   *
   * - `id`:
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
   * - `id`:
   *
   * - `data`:
   */
  globalsAssetsCategoryUpdate(params: GlobalsService.GlobalsAssetsCategoryUpdateParams): __Observable<AssetsCategoryUpdate> {
    return this.globalsAssetsCategoryUpdateResponse(params).pipe(
      __map(_r => _r.body as AssetsCategoryUpdate)
    );
  }

  /**
   * @param id undefined
   */
  globalsAssetsCategoryDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
   * @param id undefined
   */
  globalsAssetsCategoryDelete(id: string): __Observable<null> {
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

    /**
     * category
     */
    category?: string;
  }

  /**
   * Parameters for globalsAssetFileCreate
   */
  export interface GlobalsAssetFileCreateParams {
    name: string;
    file: Blob;
    category: number;
  }

  /**
   * Parameters for globalsAssetsCategoryUpdate
   */
  export interface GlobalsAssetsCategoryUpdateParams {
    id: string;
    data: AssetsCategoryUpdate;
  }
}

export { GlobalsService }
