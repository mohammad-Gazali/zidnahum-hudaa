/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
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
import { Student } from '../models/student';
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

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param ordering Which field to use when ordering the results.
   */
  studentsCategoryListResponse(ordering?: string): __Observable<__StrictHttpResponse<Array<StudentCategoryList>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (ordering != null) __params = __params.set('ordering', ordering.toString());
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
        return _r as __StrictHttpResponse<Array<StudentCategoryList>>;
      })
    );
  }
  /**
   * @param ordering Which field to use when ordering the results.
   */
  studentsCategoryList(ordering?: string): __Observable<Array<StudentCategoryList>> {
    return this.studentsCategoryListResponse(ordering).pipe(
      __map(_r => _r.body as Array<StudentCategoryList>)
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
   * @param id undefined
   */
  studentsCategoryReadResponse(id: string): __Observable<__StrictHttpResponse<StudentCategoryList>> {
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
   * @param id undefined
   */
  studentsCategoryRead(id: string): __Observable<StudentCategoryList> {
    return this.studentsCategoryReadResponse(id).pipe(
      __map(_r => _r.body as StudentCategoryList)
    );
  }

  /**
   * @param params The `StudentsService.StudentsCategoryUpdateParams` containing the following parameters:
   *
   * - `id`:
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
   * - `id`:
   *
   * - `data`:
   */
  studentsCategoryUpdate(params: StudentsService.StudentsCategoryUpdateParams): __Observable<StudentCategoryUpdate> {
    return this.studentsCategoryUpdateResponse(params).pipe(
      __map(_r => _r.body as StudentCategoryUpdate)
    );
  }

  /**
   * @param id undefined
   */
  studentsCategoryDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
   * @param id undefined
   */
  studentsCategoryDelete(id: string): __Observable<null> {
    return this.studentsCategoryDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param ordering Which field to use when ordering the results.
   */
  studentsGroupListResponse(ordering?: string): __Observable<__StrictHttpResponse<Array<StudentGroupList>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (ordering != null) __params = __params.set('ordering', ordering.toString());
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
        return _r as __StrictHttpResponse<Array<StudentGroupList>>;
      })
    );
  }
  /**
   * @param ordering Which field to use when ordering the results.
   */
  studentsGroupList(ordering?: string): __Observable<Array<StudentGroupList>> {
    return this.studentsGroupListResponse(ordering).pipe(
      __map(_r => _r.body as Array<StudentGroupList>)
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
   * @param id undefined
   */
  studentsGroupReadResponse(id: string): __Observable<__StrictHttpResponse<StudentGroupList>> {
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
   * @param id undefined
   */
  studentsGroupRead(id: string): __Observable<StudentGroupList> {
    return this.studentsGroupReadResponse(id).pipe(
      __map(_r => _r.body as StudentGroupList)
    );
  }

  /**
   * @param params The `StudentsService.StudentsGroupUpdateParams` containing the following parameters:
   *
   * - `id`:
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
   * - `id`:
   *
   * - `data`:
   */
  studentsGroupUpdate(params: StudentsService.StudentsGroupUpdateParams): __Observable<StudentGroupUpdate> {
    return this.studentsGroupUpdateResponse(params).pipe(
      __map(_r => _r.body as StudentGroupUpdate)
    );
  }

  /**
   * @param id undefined
   */
  studentsGroupDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
   * @param id undefined
   */
  studentsGroupDelete(id: string): __Observable<null> {
    return this.studentsGroupDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `StudentsService.StudentsMemorizeMessageListParams` containing the following parameters:
   *
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `sended_at__lt`: sended_at__lt
   *
   * - `sended_at__gt`: sended_at__gt
   *
   * - `sended_at`: sended_at
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `message_type`: message_type
   *
   * - `master`: master
   *
   * - `limit`: Number of results to return per page.
   *
   * - `is_doubled`: is_doubled
   */
  studentsMemorizeMessageListResponse(params: StudentsService.StudentsMemorizeMessageListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<MemorizeMessageList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.studentName != null) __params = __params.set('student__name', params.studentName.toString());
    if (params.sendedAtLt != null) __params = __params.set('sended_at__lt', params.sendedAtLt.toString());
    if (params.sendedAtGt != null) __params = __params.set('sended_at__gt', params.sendedAtGt.toString());
    if (params.sendedAt != null) __params = __params.set('sended_at', params.sendedAt.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.messageType != null) __params = __params.set('message_type', params.messageType.toString());
    if (params.master != null) __params = __params.set('master', params.master.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.isDoubled != null) __params = __params.set('is_doubled', params.isDoubled.toString());
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
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `sended_at__lt`: sended_at__lt
   *
   * - `sended_at__gt`: sended_at__gt
   *
   * - `sended_at`: sended_at
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `message_type`: message_type
   *
   * - `master`: master
   *
   * - `limit`: Number of results to return per page.
   *
   * - `is_doubled`: is_doubled
   */
  studentsMemorizeMessageList(params: StudentsService.StudentsMemorizeMessageListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<MemorizeMessageList>}> {
    return this.studentsMemorizeMessageListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<MemorizeMessageList>})
    );
  }

  /**
   * @param id undefined
   */
  studentsMemorizeMessageReadResponse(id: string): __Observable<__StrictHttpResponse<MemorizeMessageList>> {
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
   * @param id undefined
   */
  studentsMemorizeMessageRead(id: string): __Observable<MemorizeMessageList> {
    return this.studentsMemorizeMessageReadResponse(id).pipe(
      __map(_r => _r.body as MemorizeMessageList)
    );
  }

  /**
   * @param id undefined
   */
  studentsMemorizeMessageDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
   * @param id undefined
   */
  studentsMemorizeMessageDelete(id: string): __Observable<null> {
    return this.studentsMemorizeMessageDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `StudentsService.StudentsMemorizeNotesListParams` containing the following parameters:
   *
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `sended_at__lt`: sended_at__lt
   *
   * - `sended_at__gt`: sended_at__gt
   *
   * - `sended_at`: sended_at
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `master`: master
   *
   * - `limit`: Number of results to return per page.
   */
  studentsMemorizeNotesListResponse(params: StudentsService.StudentsMemorizeNotesListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<MemorizeNotesList>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.studentName != null) __params = __params.set('student__name', params.studentName.toString());
    if (params.sendedAtLt != null) __params = __params.set('sended_at__lt', params.sendedAtLt.toString());
    if (params.sendedAtGt != null) __params = __params.set('sended_at__gt', params.sendedAtGt.toString());
    if (params.sendedAt != null) __params = __params.set('sended_at', params.sendedAt.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.master != null) __params = __params.set('master', params.master.toString());
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
   * - `student__name`: param for filtering result via student name or student id
   *
   * - `sended_at__lt`: sended_at__lt
   *
   * - `sended_at__gt`: sended_at__gt
   *
   * - `sended_at`: sended_at
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `master`: master
   *
   * - `limit`: Number of results to return per page.
   */
  studentsMemorizeNotesList(params: StudentsService.StudentsMemorizeNotesListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<MemorizeNotesList>}> {
    return this.studentsMemorizeNotesListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<MemorizeNotesList>})
    );
  }

  /**
   * @param id undefined
   */
  studentsMemorizeNotesReadResponse(id: string): __Observable<__StrictHttpResponse<MemorizeNotesList>> {
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
   * @param id undefined
   */
  studentsMemorizeNotesRead(id: string): __Observable<MemorizeNotesList> {
    return this.studentsMemorizeNotesReadResponse(id).pipe(
      __map(_r => _r.body as MemorizeNotesList)
    );
  }

  /**
   * @param id undefined
   */
  studentsMemorizeNotesDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
   * @param id undefined
   */
  studentsMemorizeNotesDelete(id: string): __Observable<null> {
    return this.studentsMemorizeNotesDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `StudentsService.StudentsStudentListParams` containing the following parameters:
   *
   * - `registered_at__lt`: registered_at__lt
   *
   * - `registered_at__gt`: registered_at__gt
   *
   * - `registered_at`: registered_at
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `name`: param for filtering student via his name or his id
   *
   * - `limit`: Number of results to return per page.
   *
   * - `group__isnull`: group__isnull
   *
   * - `group`: group
   *
   * - `category__isnull`: category__isnull
   *
   * - `category`: category
   */
  studentsStudentListResponse(params: StudentsService.StudentsStudentListParams): __Observable<__StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Student>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.registeredAtLt != null) __params = __params.set('registered_at__lt', params.registeredAtLt.toString());
    if (params.registeredAtGt != null) __params = __params.set('registered_at__gt', params.registeredAtGt.toString());
    if (params.registeredAt != null) __params = __params.set('registered_at', params.registeredAt.toString());
    if (params.ordering != null) __params = __params.set('ordering', params.ordering.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.groupIsnull != null) __params = __params.set('group__isnull', params.groupIsnull.toString());
    if (params.group != null) __params = __params.set('group', params.group.toString());
    if (params.categoryIsnull != null) __params = __params.set('category__isnull', params.categoryIsnull.toString());
    if (params.category != null) __params = __params.set('category', params.category.toString());
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
        return _r as __StrictHttpResponse<{count: number, next?: null | string, previous?: null | string, results: Array<Student>}>;
      })
    );
  }
  /**
   * @param params The `StudentsService.StudentsStudentListParams` containing the following parameters:
   *
   * - `registered_at__lt`: registered_at__lt
   *
   * - `registered_at__gt`: registered_at__gt
   *
   * - `registered_at`: registered_at
   *
   * - `ordering`: Which field to use when ordering the results.
   *
   * - `offset`: The initial index from which to return the results.
   *
   * - `name`: param for filtering student via his name or his id
   *
   * - `limit`: Number of results to return per page.
   *
   * - `group__isnull`: group__isnull
   *
   * - `group`: group
   *
   * - `category__isnull`: category__isnull
   *
   * - `category`: category
   */
  studentsStudentList(params: StudentsService.StudentsStudentListParams): __Observable<{count: number, next?: null | string, previous?: null | string, results: Array<Student>}> {
    return this.studentsStudentListResponse(params).pipe(
      __map(_r => _r.body as {count: number, next?: null | string, previous?: null | string, results: Array<Student>})
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
   * @param id undefined
   */
  studentsStudentReadResponse(id: string): __Observable<__StrictHttpResponse<Student>> {
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
        return _r as __StrictHttpResponse<Student>;
      })
    );
  }
  /**
   * @param id undefined
   */
  studentsStudentRead(id: string): __Observable<Student> {
    return this.studentsStudentReadResponse(id).pipe(
      __map(_r => _r.body as Student)
    );
  }

  /**
   * @param params The `StudentsService.StudentsStudentUpdateParams` containing the following parameters:
   *
   * - `id`:
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
   * - `id`:
   *
   * - `data`:
   */
  studentsStudentUpdate(params: StudentsService.StudentsStudentUpdateParams): __Observable<StudentUpdate> {
    return this.studentsStudentUpdateResponse(params).pipe(
      __map(_r => _r.body as StudentUpdate)
    );
  }

  /**
   * @param id undefined
   */
  studentsStudentDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
   * @param id undefined
   */
  studentsStudentDelete(id: string): __Observable<null> {
    return this.studentsStudentDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module StudentsService {

  /**
   * Parameters for studentsCategoryUpdate
   */
  export interface StudentsCategoryUpdateParams {
    id: string;
    data: StudentCategoryUpdate;
  }

  /**
   * Parameters for studentsGroupUpdate
   */
  export interface StudentsGroupUpdateParams {
    id: string;
    data: StudentGroupUpdate;
  }

  /**
   * Parameters for studentsMemorizeMessageList
   */
  export interface StudentsMemorizeMessageListParams {

    /**
     * param for filtering result via student name or student id
     */
    studentName?: string;

    /**
     * sended_at__lt
     */
    sendedAtLt?: string;

    /**
     * sended_at__gt
     */
    sendedAtGt?: string;

    /**
     * sended_at
     */
    sendedAt?: string;

    /**
     * Which field to use when ordering the results.
     */
    ordering?: string;

    /**
     * The initial index from which to return the results.
     */
    offset?: number;

    /**
     * message_type
     */
    messageType?: '1' | '2' | '3' | '4' | '5';

    /**
     * master
     */
    master?: string;

    /**
     * Number of results to return per page.
     */
    limit?: number;

    /**
     * is_doubled
     */
    isDoubled?: string;
  }

  /**
   * Parameters for studentsMemorizeNotesList
   */
  export interface StudentsMemorizeNotesListParams {

    /**
     * param for filtering result via student name or student id
     */
    studentName?: string;

    /**
     * sended_at__lt
     */
    sendedAtLt?: string;

    /**
     * sended_at__gt
     */
    sendedAtGt?: string;

    /**
     * sended_at
     */
    sendedAt?: string;

    /**
     * Which field to use when ordering the results.
     */
    ordering?: string;

    /**
     * The initial index from which to return the results.
     */
    offset?: number;

    /**
     * master
     */
    master?: string;

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
     * registered_at__lt
     */
    registeredAtLt?: string;

    /**
     * registered_at__gt
     */
    registeredAtGt?: string;

    /**
     * registered_at
     */
    registeredAt?: string;

    /**
     * Which field to use when ordering the results.
     */
    ordering?: string;

    /**
     * The initial index from which to return the results.
     */
    offset?: number;

    /**
     * param for filtering student via his name or his id
     */
    name?: string;

    /**
     * Number of results to return per page.
     */
    limit?: number;

    /**
     * group__isnull
     */
    groupIsnull?: string;

    /**
     * group
     */
    group?: string;

    /**
     * category__isnull
     */
    categoryIsnull?: string;

    /**
     * category
     */
    category?: string;
  }

  /**
   * Parameters for studentsStudentUpdate
   */
  export interface StudentsStudentUpdateParams {
    id: string;
    data: StudentUpdate;
  }
}

export { StudentsService }
