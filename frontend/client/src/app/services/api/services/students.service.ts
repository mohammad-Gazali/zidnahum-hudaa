/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { StudentList } from '../models/student-list';
import { MemorizeMessage } from '../models/memorize-message';
import { MemorizeNotesCreate } from '../models/memorize-notes-create';
import { StudentDetails } from '../models/student-details';
@Injectable({
  providedIn: 'root',
})
class StudentsService extends __BaseService {
  static readonly studentsListPath = '/students/';
  static readonly studentsMemorizeMessageListPath = '/students/memorize-message';
  static readonly studentsMemorizeMessageDeletePath = '/students/memorize-message/{id}';
  static readonly studentsMemorizeNotesCreatePath = '/students/memorize-notes';
  static readonly studentsMemorizeNotesDeletePath = '/students/memorize-notes/{id}';
  static readonly studentsNonRegTodayReadPath = '/students/non-reg-today/{coming_category_id}';
  static readonly studentsUpdateAlarbaeinAlnawawiaUpdatePath = '/students/update/alarbaein-alnawawia/{id}';
  static readonly studentsUpdateAllahNamesUpdatePath = '/students/update/allah-names/{id}';
  static readonly studentsUpdatePartsReceivedUpdatePath = '/students/update/parts-received/{id}';
  static readonly studentsUpdateQmemoUpdatePath = '/students/update/qmemo/{id}';
  static readonly studentsUpdateQtestUpdatePath = '/students/update/qtest/{id}';
  static readonly studentsUpdateRiadAlsaalihinUpdatePath = '/students/update/riad-alsaalihin/{id}';
  static readonly studentsReadPath = '/students/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `StudentsService.StudentsListParams` containing the following parameters:
   *
   * - `query`: param for filtering result via student name or student id
   *
   * - `page`: A page number within the paginated result set.
   */
  studentsListResponse(params: StudentsService.StudentsListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<StudentList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.query != null) __params = __params.set('query', params.query.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<StudentList>}>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsListParams` containing the following parameters:
   *
   * - `query`: param for filtering result via student name or student id
   *
   * - `page`: A page number within the paginated result set.
   */
  studentsList(params: StudentsService.StudentsListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<StudentList>}> {
    return this.studentsListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<StudentList>})
    );
  }

  /**
   * @param page A page number within the paginated result set.
   */
  studentsMemorizeMessageListResponse(page?: number): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<MemorizeMessage>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/memorize-message`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<MemorizeMessage>}>;
      })
    );
  }
  /**
   * @param page A page number within the paginated result set.
   */
  studentsMemorizeMessageList(page?: number): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<MemorizeMessage>}> {
    return this.studentsMemorizeMessageListResponse(page).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<MemorizeMessage>})
    );
  }

  /**
   * @param id A unique integer value identifying this رسالة تسميع.
   */
  studentsMemorizeMessageDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/students/memorize-message/${encodeURIComponent(String(id))}`,
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
   * @param id A unique integer value identifying this رسالة تسميع.
   */
  studentsMemorizeMessageDelete(id: number): __Observable<null> {
    return this.studentsMemorizeMessageDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  studentsMemorizeNotesCreateResponse(data: MemorizeNotesCreate): __Observable<__StrictHttpResponse<MemorizeNotesCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/students/memorize-notes`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MemorizeNotesCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  studentsMemorizeNotesCreate(data: MemorizeNotesCreate): __Observable<MemorizeNotesCreate> {
    return this.studentsMemorizeNotesCreateResponse(data).pipe(
      __map(_r => _r.body as MemorizeNotesCreate)
    );
  }

  /**
   * @param id A unique integer value identifying this ملاحظة تسميع.
   */
  studentsMemorizeNotesDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/students/memorize-notes/${encodeURIComponent(String(id))}`,
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
   * @param id A unique integer value identifying this ملاحظة تسميع.
   */
  studentsMemorizeNotesDelete(id: number): __Observable<null> {
    return this.studentsMemorizeNotesDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `StudentsService.StudentsNonRegTodayReadParams` containing the following parameters:
   *
   * - `coming_category_id`:
   *
   * - `page`: A page number within the paginated result set.
   */
  studentsNonRegTodayReadResponse(params: StudentsService.StudentsNonRegTodayReadParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<StudentList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/non-reg-today/${encodeURIComponent(String(params.comingCategoryId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<StudentList>}>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsNonRegTodayReadParams` containing the following parameters:
   *
   * - `coming_category_id`:
   *
   * - `page`: A page number within the paginated result set.
   */
  studentsNonRegTodayRead(params: StudentsService.StudentsNonRegTodayReadParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<StudentList>}> {
    return this.studentsNonRegTodayReadResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<StudentList>})
    );
  }

  /**
   * @param id undefined
   */
  studentsUpdateAlarbaeinAlnawawiaUpdateResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/students/update/alarbaein-alnawawia/${encodeURIComponent(String(id))}`,
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
  studentsUpdateAlarbaeinAlnawawiaUpdate(id: string): __Observable<null> {
    return this.studentsUpdateAlarbaeinAlnawawiaUpdateResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  studentsUpdateAllahNamesUpdateResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/students/update/allah-names/${encodeURIComponent(String(id))}`,
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
  studentsUpdateAllahNamesUpdate(id: string): __Observable<null> {
    return this.studentsUpdateAllahNamesUpdateResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  studentsUpdatePartsReceivedUpdateResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/students/update/parts-received/${encodeURIComponent(String(id))}`,
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
  studentsUpdatePartsReceivedUpdate(id: string): __Observable<null> {
    return this.studentsUpdatePartsReceivedUpdateResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  studentsUpdateQmemoUpdateResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/students/update/qmemo/${encodeURIComponent(String(id))}`,
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
  studentsUpdateQmemoUpdate(id: string): __Observable<null> {
    return this.studentsUpdateQmemoUpdateResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  studentsUpdateQtestUpdateResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/students/update/qtest/${encodeURIComponent(String(id))}`,
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
  studentsUpdateQtestUpdate(id: string): __Observable<null> {
    return this.studentsUpdateQtestUpdateResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  studentsUpdateRiadAlsaalihinUpdateResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/students/update/riad-alsaalihin/${encodeURIComponent(String(id))}`,
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
  studentsUpdateRiadAlsaalihinUpdate(id: string): __Observable<null> {
    return this.studentsUpdateRiadAlsaalihinUpdateResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  studentsReadResponse(id: string): __Observable<__StrictHttpResponse<StudentDetails>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StudentDetails>;
      })
    );
  }
  /**
   * @param id undefined
   */
  studentsRead(id: string): __Observable<StudentDetails> {
    return this.studentsReadResponse(id).pipe(
      __map(_r => _r.body as StudentDetails)
    );
  }
}

module StudentsService {

  /**
   * Parameters for studentsList
   */
  export interface StudentsListParams {

    /**
     * param for filtering result via student name or student id
     */
    query?: string;

    /**
     * A page number within the paginated result set.
     */
    page?: number;
  }

  /**
   * Parameters for studentsNonRegTodayRead
   */
  export interface StudentsNonRegTodayReadParams {
    comingCategoryId: string;

    /**
     * A page number within the paginated result set.
     */
    page?: number;
  }
}

export { StudentsService }
