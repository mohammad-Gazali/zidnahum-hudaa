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
import { StudentUpdateAlarbaeinAlnawawia } from '../models/student-update-alarbaein-alnawawia';
import { StudentUpdatePartsReceived } from '../models/student-update-parts-received';
import { StudentUpdateQMemo } from '../models/student-update-qmemo';
import { StudentUpdateQTest } from '../models/student-update-qtest';
import { StudentUpdateRiadAlsaalihin } from '../models/student-update-riad-alsaalihin';
import { StudentDetails } from '../models/student-details';
import { StudentWithComingRegistrationList } from '../models/student-with-coming-registration-list';
@Injectable({
  providedIn: 'root',
})
class StudentsService extends __BaseService {
  static readonly studentsListPath = '/students/';
  static readonly studentsWithComingRegistrationListPath = '/students/with-coming-registration/{coming_category_id}';
  static readonly studentsMemorizeMessageListPath = '/students/memorize-message';
  static readonly studentsMemorizeMessageDeletePath = '/students/memorize-message/{id}';
  static readonly studentsMemorizeNotesCreatePath = '/students/memorize-notes';
  static readonly studentsMemorizeNotesDeletePath = '/students/memorize-notes/{id}';
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
  studentsWithComingRegistrationListResponse(params: StudentsService.StudentsWithComingRegistrationListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<StudentWithComingRegistrationList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.query != null) __params = __params.set('query', params.query.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.masjed) __params = __params.set('masjed', params.masjed.toString());

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/with-coming-registration/${encodeURIComponent(String(params.comingCategoryId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<StudentWithComingRegistrationList>}>;
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
  studentsWithComingRegistrationList(params: StudentsService.StudentsWithComingRegistrationListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<StudentWithComingRegistrationList>}> {
    return this.studentsWithComingRegistrationListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<StudentWithComingRegistrationList>})
    );
  }

  /**
   * @param params The `StudentsService.StudentsUpdateAlarbaeinAlnawawiaUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  studentsUpdateAlarbaeinAlnawawiaUpdateResponse(params: StudentsService.StudentsUpdateAlarbaeinAlnawawiaUpdateParams): __Observable<__StrictHttpResponse<StudentUpdateAlarbaeinAlnawawia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/students/update/alarbaein-alnawawia/${encodeURIComponent(String(params.id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StudentUpdateAlarbaeinAlnawawia>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsUpdateAlarbaeinAlnawawiaUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  studentsUpdateAlarbaeinAlnawawiaUpdate(params: StudentsService.StudentsUpdateAlarbaeinAlnawawiaUpdateParams): __Observable<StudentUpdateAlarbaeinAlnawawia> {
    return this.studentsUpdateAlarbaeinAlnawawiaUpdateResponse(params).pipe(
      __map(_r => _r.body as StudentUpdateAlarbaeinAlnawawia)
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
   * @param params The `StudentsService.StudentsUpdatePartsReceivedUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  studentsUpdatePartsReceivedUpdateResponse(params: StudentsService.StudentsUpdatePartsReceivedUpdateParams): __Observable<__StrictHttpResponse<StudentUpdatePartsReceived>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/students/update/parts-received/${encodeURIComponent(String(params.id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StudentUpdatePartsReceived>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsUpdatePartsReceivedUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  studentsUpdatePartsReceivedUpdate(params: StudentsService.StudentsUpdatePartsReceivedUpdateParams): __Observable<StudentUpdatePartsReceived> {
    return this.studentsUpdatePartsReceivedUpdateResponse(params).pipe(
      __map(_r => _r.body as StudentUpdatePartsReceived)
    );
  }

  /**
   * @param params The `StudentsService.StudentsUpdateQmemoUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  studentsUpdateQmemoUpdateResponse(params: StudentsService.StudentsUpdateQmemoUpdateParams): __Observable<__StrictHttpResponse<{ repeated_memo: number[] }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/students/update/qmemo/${encodeURIComponent(String(params.id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ repeated_memo: number[] }>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsUpdateQmemoUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  studentsUpdateQmemoUpdate(params: StudentsService.StudentsUpdateQmemoUpdateParams): __Observable<{ repeated_memo: number[] }> {
    return this.studentsUpdateQmemoUpdateResponse(params).pipe(
      __map(_r => _r.body as { repeated_memo: number[] })
    );
  }

  /**
   * @param params The `StudentsService.StudentsUpdateQtestUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  studentsUpdateQtestUpdateResponse(params: StudentsService.StudentsUpdateQtestUpdateParams): __Observable<__StrictHttpResponse<{ repeated_test: number[] }>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/students/update/qtest/${encodeURIComponent(String(params.id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{ repeated_test: number[] }>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsUpdateQtestUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  studentsUpdateQtestUpdate(params: StudentsService.StudentsUpdateQtestUpdateParams): __Observable<{ repeated_test: number[] }> {
    return this.studentsUpdateQtestUpdateResponse(params).pipe(
      __map(_r => _r.body as { repeated_test: number[] })
    );
  }

  /**
   * @param params The `StudentsService.StudentsUpdateRiadAlsaalihinUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  studentsUpdateRiadAlsaalihinUpdateResponse(params: StudentsService.StudentsUpdateRiadAlsaalihinUpdateParams): __Observable<__StrictHttpResponse<StudentUpdateRiadAlsaalihin>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/students/update/riad-alsaalihin/${encodeURIComponent(String(params.id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StudentUpdateRiadAlsaalihin>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsUpdateRiadAlsaalihinUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  studentsUpdateRiadAlsaalihinUpdate(params: StudentsService.StudentsUpdateRiadAlsaalihinUpdateParams): __Observable<StudentUpdateRiadAlsaalihin> {
    return this.studentsUpdateRiadAlsaalihinUpdateResponse(params).pipe(
      __map(_r => _r.body as StudentUpdateRiadAlsaalihin)
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
   * Parameters for StudentsWithComingRegistrationListParams
   */
  export interface StudentsWithComingRegistrationListParams {
    /**
    * param for filtering result via student name or student id
    */
    query?: string;

    /**
     * param for filtering result via masjed
     */
    masjed?: 1 | 2 | 3;

    comingCategoryId: string;

    /**
     * A page number within the paginated result set.
     */
    page?: number;
  }

  /**
   * Parameters for studentsUpdateAlarbaeinAlnawawiaUpdate
   */
  export interface StudentsUpdateAlarbaeinAlnawawiaUpdateParams {
    id: string;
    data: StudentUpdateAlarbaeinAlnawawia;
  }

  /**
   * Parameters for studentsUpdatePartsReceivedUpdate
   */
  export interface StudentsUpdatePartsReceivedUpdateParams {
    id: string;
    data: StudentUpdatePartsReceived;
  }

  /**
   * Parameters for studentsUpdateQmemoUpdate
   */
  export interface StudentsUpdateQmemoUpdateParams {
    id: string;
    data: StudentUpdateQMemo;
  }

  /**
   * Parameters for studentsUpdateQtestUpdate
   */
  export interface StudentsUpdateQtestUpdateParams {
    id: string;
    data: StudentUpdateQTest;
  }

  /**
   * Parameters for studentsUpdateRiadAlsaalihinUpdate
   */
  export interface StudentsUpdateRiadAlsaalihinUpdateParams {
    id: string;
    data: StudentUpdateRiadAlsaalihin;
  }
}

export { StudentsService }
