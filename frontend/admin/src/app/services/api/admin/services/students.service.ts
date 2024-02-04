/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { StudentCategoryList } from '../models/student-category-list';
import { StudentCategoryCreate } from '../models/student-category-create';
import { StudentCategoryUpdate } from '../models/student-category-update';
import { StudentGroupList } from '../models/student-group-list';
import { StudentGroupCreate } from '../models/student-group-create';
import { StudentGroupUpdate } from '../models/student-group-update';
import { MemorizeMessageList } from '../models/memorize-message-list';
import { MemorizeNotesList } from '../models/memorize-notes-list';
import { StudentList } from '../models/student-list';
import { StudentCreate } from '../models/student-create';
import { StudentUpdate } from '../models/student-update';
@Injectable({
  providedIn: 'root',
})
class StudentsService extends __BaseService {
  static readonly studentsCategoryListPath = '/students/category/';
  static readonly studentsCategoryCreatePath = '/students/category/';
  static readonly studentsCategoryReadPath = '/students/category/{id}/';
  static readonly studentsCategoryUpdatePath = '/students/category/{id}/';
  static readonly studentsCategoryDeletePath = '/students/category/{id}/';
  static readonly studentsGroupListPath = '/students/group/';
  static readonly studentsGroupCreatePath = '/students/group/';
  static readonly studentsGroupReadPath = '/students/group/{id}/';
  static readonly studentsGroupUpdatePath = '/students/group/{id}/';
  static readonly studentsGroupDeletePath = '/students/group/{id}/';
  static readonly studentsMemorizeMessageListPath = '/students/memorize-message/';
  static readonly studentsMemorizeMessageReadPath = '/students/memorize-message/{id}/';
  static readonly studentsMemorizeMessageDeletePath = '/students/memorize-message/{id}/';
  static readonly studentsMemorizeNotesListPath = '/students/memorize-notes/';
  static readonly studentsMemorizeNotesReadPath = '/students/memorize-notes/{id}/';
  static readonly studentsMemorizeNotesDeletePath = '/students/memorize-notes/{id}/';
  static readonly studentsStudentListPath = '/students/student/';
  static readonly studentsStudentCreatePath = '/students/student/';
  static readonly studentsStudentReadPath = '/students/student/{id}/';
  static readonly studentsStudentUpdatePath = '/students/student/{id}/';
  static readonly studentsStudentDeletePath = '/students/student/{id}/';

  /**
   * @param params The `StudentsService.StudentsCategoryListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  studentsCategoryListResponse(params: StudentsService.StudentsCategoryListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<StudentCategoryList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/category/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<StudentCategoryList>}>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsCategoryListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  studentsCategoryList(params: StudentsService.StudentsCategoryListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<StudentCategoryList>}> {
    return this.studentsCategoryListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<StudentCategoryList>})
    );
  }

  /**
   * @param data undefined
   */
  studentsCategoryCreateResponse(data: StudentCategoryCreate): __Observable<__StrictHttpResponse<StudentCategoryCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/students/category/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StudentCategoryCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  studentsCategoryCreate(data: StudentCategoryCreate): __Observable<StudentCategoryCreate> {
    return this.studentsCategoryCreateResponse(data).pipe(
      __map(_r => _r.body as StudentCategoryCreate)
    );
  }

  /**
   * @param id A unique integer value identifying this فئة الطلاب.
   */
  studentsCategoryReadResponse(id: number): __Observable<__StrictHttpResponse<StudentCategoryList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/category/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StudentCategoryList>;
      })
    );
  }
  /**
   * @param id A unique integer value identifying this فئة الطلاب.
   */
  studentsCategoryRead(id: number): __Observable<StudentCategoryList> {
    return this.studentsCategoryReadResponse(id).pipe(
      __map(_r => _r.body as StudentCategoryList)
    );
  }

  /**
   * @param params The `StudentsService.StudentsCategoryUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this فئة الطلاب.
   *
   * - `data`:
   */
  studentsCategoryUpdateResponse(params: StudentsService.StudentsCategoryUpdateParams): __Observable<__StrictHttpResponse<StudentCategoryUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/students/category/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StudentCategoryUpdate>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsCategoryUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this فئة الطلاب.
   *
   * - `data`:
   */
  studentsCategoryUpdate(params: StudentsService.StudentsCategoryUpdateParams): __Observable<StudentCategoryUpdate> {
    return this.studentsCategoryUpdateResponse(params).pipe(
      __map(_r => _r.body as StudentCategoryUpdate)
    );
  }

  /**
   * @param id A unique integer value identifying this فئة الطلاب.
   */
  studentsCategoryDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/students/category/${encodeURIComponent(String(id))}/`,
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
   * @param id A unique integer value identifying this فئة الطلاب.
   */
  studentsCategoryDelete(id: number): __Observable<null> {
    return this.studentsCategoryDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `StudentsService.StudentsGroupListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  studentsGroupListResponse(params: StudentsService.StudentsGroupListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<StudentGroupList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/group/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<StudentGroupList>}>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsGroupListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  studentsGroupList(params: StudentsService.StudentsGroupListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<StudentGroupList>}> {
    return this.studentsGroupListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<StudentGroupList>})
    );
  }

  /**
   * @param data undefined
   */
  studentsGroupCreateResponse(data: StudentGroupCreate): __Observable<__StrictHttpResponse<StudentGroupCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/students/group/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StudentGroupCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  studentsGroupCreate(data: StudentGroupCreate): __Observable<StudentGroupCreate> {
    return this.studentsGroupCreateResponse(data).pipe(
      __map(_r => _r.body as StudentGroupCreate)
    );
  }

  /**
   * @param id A unique integer value identifying this مجموعة الطلاب.
   */
  studentsGroupReadResponse(id: number): __Observable<__StrictHttpResponse<StudentGroupList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/group/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StudentGroupList>;
      })
    );
  }
  /**
   * @param id A unique integer value identifying this مجموعة الطلاب.
   */
  studentsGroupRead(id: number): __Observable<StudentGroupList> {
    return this.studentsGroupReadResponse(id).pipe(
      __map(_r => _r.body as StudentGroupList)
    );
  }

  /**
   * @param params The `StudentsService.StudentsGroupUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this مجموعة الطلاب.
   *
   * - `data`:
   */
  studentsGroupUpdateResponse(params: StudentsService.StudentsGroupUpdateParams): __Observable<__StrictHttpResponse<StudentGroupUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/students/group/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StudentGroupUpdate>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsGroupUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this مجموعة الطلاب.
   *
   * - `data`:
   */
  studentsGroupUpdate(params: StudentsService.StudentsGroupUpdateParams): __Observable<StudentGroupUpdate> {
    return this.studentsGroupUpdateResponse(params).pipe(
      __map(_r => _r.body as StudentGroupUpdate)
    );
  }

  /**
   * @param id A unique integer value identifying this مجموعة الطلاب.
   */
  studentsGroupDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/students/group/${encodeURIComponent(String(id))}/`,
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
   * @param id A unique integer value identifying this مجموعة الطلاب.
   */
  studentsGroupDelete(id: number): __Observable<null> {
    return this.studentsGroupDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `StudentsService.StudentsMemorizeMessageListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  studentsMemorizeMessageListResponse(params: StudentsService.StudentsMemorizeMessageListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<MemorizeMessageList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/memorize-message/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<MemorizeMessageList>}>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsMemorizeMessageListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  studentsMemorizeMessageList(params: StudentsService.StudentsMemorizeMessageListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<MemorizeMessageList>}> {
    return this.studentsMemorizeMessageListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<MemorizeMessageList>})
    );
  }

  /**
   * @param id A unique integer value identifying this رسالة تسميع.
   */
  studentsMemorizeMessageReadResponse(id: number): __Observable<__StrictHttpResponse<MemorizeMessageList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/memorize-message/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MemorizeMessageList>;
      })
    );
  }
  /**
   * @param id A unique integer value identifying this رسالة تسميع.
   */
  studentsMemorizeMessageRead(id: number): __Observable<MemorizeMessageList> {
    return this.studentsMemorizeMessageReadResponse(id).pipe(
      __map(_r => _r.body as MemorizeMessageList)
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
      this.rootUrl + `/students/memorize-message/${encodeURIComponent(String(id))}/`,
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
   * @param params The `StudentsService.StudentsMemorizeNotesListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  studentsMemorizeNotesListResponse(params: StudentsService.StudentsMemorizeNotesListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<MemorizeNotesList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/memorize-notes/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<MemorizeNotesList>}>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsMemorizeNotesListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  studentsMemorizeNotesList(params: StudentsService.StudentsMemorizeNotesListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<MemorizeNotesList>}> {
    return this.studentsMemorizeNotesListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<MemorizeNotesList>})
    );
  }

  /**
   * @param id A unique integer value identifying this ملاحظة تسميع.
   */
  studentsMemorizeNotesReadResponse(id: number): __Observable<__StrictHttpResponse<MemorizeNotesList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/memorize-notes/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MemorizeNotesList>;
      })
    );
  }
  /**
   * @param id A unique integer value identifying this ملاحظة تسميع.
   */
  studentsMemorizeNotesRead(id: number): __Observable<MemorizeNotesList> {
    return this.studentsMemorizeNotesReadResponse(id).pipe(
      __map(_r => _r.body as MemorizeNotesList)
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
      this.rootUrl + `/students/memorize-notes/${encodeURIComponent(String(id))}/`,
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
   * @param params The `StudentsService.StudentsStudentListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  studentsStudentListResponse(params: StudentsService.StudentsStudentListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<StudentList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/student/`,
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
   * @param params The `StudentsService.StudentsStudentListParams` containing the following parameters:
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `limit`: Number of results to return per page.
   */
  studentsStudentList(params: StudentsService.StudentsStudentListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<StudentList>}> {
    return this.studentsStudentListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<StudentList>})
    );
  }

  /**
   * @param data undefined
   */
  studentsStudentCreateResponse(data: StudentCreate): __Observable<__StrictHttpResponse<StudentCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/students/student/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StudentCreate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  studentsStudentCreate(data: StudentCreate): __Observable<StudentCreate> {
    return this.studentsStudentCreateResponse(data).pipe(
      __map(_r => _r.body as StudentCreate)
    );
  }

  /**
   * @param id A unique integer value identifying this طالب.
   */
  studentsStudentReadResponse(id: number): __Observable<__StrictHttpResponse<StudentList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/students/student/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StudentList>;
      })
    );
  }
  /**
   * @param id A unique integer value identifying this طالب.
   */
  studentsStudentRead(id: number): __Observable<StudentList> {
    return this.studentsStudentReadResponse(id).pipe(
      __map(_r => _r.body as StudentList)
    );
  }

  /**
   * @param params The `StudentsService.StudentsStudentUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this طالب.
   *
   * - `data`:
   */
  studentsStudentUpdateResponse(params: StudentsService.StudentsStudentUpdateParams): __Observable<__StrictHttpResponse<StudentUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/students/student/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StudentUpdate>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsStudentUpdateParams` containing the following parameters:
   *
   * - `id`: A unique integer value identifying this طالب.
   *
   * - `data`:
   */
  studentsStudentUpdate(params: StudentsService.StudentsStudentUpdateParams): __Observable<StudentUpdate> {
    return this.studentsStudentUpdateResponse(params).pipe(
      __map(_r => _r.body as StudentUpdate)
    );
  }

  /**
   * @param id A unique integer value identifying this طالب.
   */
  studentsStudentDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/students/student/${encodeURIComponent(String(id))}/`,
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
   * @param id A unique integer value identifying this طالب.
   */
  studentsStudentDelete(id: number): __Observable<null> {
    return this.studentsStudentDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module StudentsService {

  /**
   * Parameters for studentsCategoryList
   */
  export interface StudentsCategoryListParams {

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
   * Parameters for studentsCategoryUpdate
   */
  export interface StudentsCategoryUpdateParams {

    /**
     * A unique integer value identifying this فئة الطلاب.
     */
    id: number;
    data: StudentCategoryUpdate;
  }

  /**
   * Parameters for studentsGroupList
   */
  export interface StudentsGroupListParams {

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
   * Parameters for studentsGroupUpdate
   */
  export interface StudentsGroupUpdateParams {

    /**
     * A unique integer value identifying this مجموعة الطلاب.
     */
    id: number;
    data: StudentGroupUpdate;
  }

  /**
   * Parameters for studentsMemorizeMessageList
   */
  export interface StudentsMemorizeMessageListParams {

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
   * Parameters for studentsMemorizeNotesList
   */
  export interface StudentsMemorizeNotesListParams {

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
   * Parameters for studentsStudentList
   */
  export interface StudentsStudentListParams {

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
   * Parameters for studentsStudentUpdate
   */
  export interface StudentsStudentUpdateParams {

    /**
     * A unique integer value identifying this طالب.
     */
    id: number;
    data: StudentUpdate;
  }
}

export { StudentsService }
