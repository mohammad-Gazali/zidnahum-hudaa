/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { IdsAction } from '../models/ids-action';
import { ActionBooleanUpdate } from '../models/action-boolean-update';
import { UserUpdatePassword } from '../models/user-update-password';
@Injectable({
  providedIn: 'root',
})
class ActionsService extends __BaseService {
  static readonly actionsAssetFileDeleteDeletePath = '/actions/asset-file/delete';
  static readonly actionsAssetsCategoryDeleteDeletePath = '/actions/assets-category/delete';
  static readonly actionsAwqafNoQStudentRelationDeleteDeletePath = '/actions/awqaf-no-q-student-relation/delete';
  static readonly actionsAwqafTestNoQDeleteDeletePath = '/actions/awqaf-test-no-q/delete';
  static readonly actionsComingCategoryDeleteDeletePath = '/actions/coming-category/delete';
  static readonly actionsComingDeleteDeletePath = '/actions/coming/delete';
  static readonly actionsGroupDeleteDeletePath = '/actions/group/delete';
  static readonly actionsMemorizeMessageDeleteDeletePath = '/actions/memorize-message/delete';
  static readonly actionsMemorizeNotesDeleteDeletePath = '/actions/memorize-notes/delete';
  static readonly actionsMoneyDeletingCauseDeleteDeletePath = '/actions/money-deleting-cause/delete';
  static readonly actionsMoneyDeletingActiveUpdatePath = '/actions/money-deleting/active';
  static readonly actionsPointsAddingCauseDeleteDeletePath = '/actions/points-adding-cause/delete';
  static readonly actionsPointsAddingDeleteDeletePath = '/actions/points-adding/delete';
  static readonly actionsPointsDeletingCauseDeleteDeletePath = '/actions/points-deleting-cause/delete';
  static readonly actionsPointsDeletingDeleteDeletePath = '/actions/points-deleting/delete';
  static readonly actionsStudentCategoryDeleteDeletePath = '/actions/student-category/delete';
  static readonly actionsStudentGroupDeleteDeletePath = '/actions/student-group/delete';
  static readonly actionsStudentDeleteDeletePath = '/actions/student/delete';
  static readonly actionsUserActiveUpdatePath = '/actions/user/active';
  static readonly actionsUserDeleteDeletePath = '/actions/user/delete';
  static readonly actionsUserPasswordUpdatePath = '/actions/user/password';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param data undefined
   */
  actionsAssetFileDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/asset-file/delete`,
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
   * @param data undefined
   */
  actionsAssetFileDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsAssetFileDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsAssetsCategoryDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/assets-category/delete`,
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
   * @param data undefined
   */
  actionsAssetsCategoryDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsAssetsCategoryDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsAwqafNoQStudentRelationDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/awqaf-no-q-student-relation/delete`,
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
   * @param data undefined
   */
  actionsAwqafNoQStudentRelationDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsAwqafNoQStudentRelationDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsAwqafTestNoQDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/awqaf-test-no-q/delete`,
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
   * @param data undefined
   */
  actionsAwqafTestNoQDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsAwqafTestNoQDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsComingCategoryDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/coming-category/delete`,
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
   * @param data undefined
   */
  actionsComingCategoryDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsComingCategoryDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsComingDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/coming/delete`,
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
   * @param data undefined
   */
  actionsComingDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsComingDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsGroupDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/group/delete`,
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
   * @param data undefined
   */
  actionsGroupDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsGroupDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsMemorizeMessageDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/memorize-message/delete`,
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
   * @param data undefined
   */
  actionsMemorizeMessageDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsMemorizeMessageDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsMemorizeNotesDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/memorize-notes/delete`,
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
   * @param data undefined
   */
  actionsMemorizeNotesDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsMemorizeNotesDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsMoneyDeletingCauseDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/money-deleting-cause/delete`,
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
   * @param data undefined
   */
  actionsMoneyDeletingCauseDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsMoneyDeletingCauseDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsMoneyDeletingActiveUpdateResponse(data: ActionBooleanUpdate): __Observable<__StrictHttpResponse<ActionBooleanUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/actions/money-deleting/active`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ActionBooleanUpdate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  actionsMoneyDeletingActiveUpdate(data: ActionBooleanUpdate): __Observable<ActionBooleanUpdate> {
    return this.actionsMoneyDeletingActiveUpdateResponse(data).pipe(
      __map(_r => _r.body as ActionBooleanUpdate)
    );
  }

  /**
   * @param data undefined
   */
  actionsPointsAddingCauseDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/points-adding-cause/delete`,
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
   * @param data undefined
   */
  actionsPointsAddingCauseDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsPointsAddingCauseDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsPointsAddingDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/points-adding/delete`,
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
   * @param data undefined
   */
  actionsPointsAddingDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsPointsAddingDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsPointsDeletingCauseDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/points-deleting-cause/delete`,
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
   * @param data undefined
   */
  actionsPointsDeletingCauseDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsPointsDeletingCauseDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsPointsDeletingDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/points-deleting/delete`,
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
   * @param data undefined
   */
  actionsPointsDeletingDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsPointsDeletingDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsStudentCategoryDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/student-category/delete`,
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
   * @param data undefined
   */
  actionsStudentCategoryDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsStudentCategoryDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsStudentGroupDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/student-group/delete`,
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
   * @param data undefined
   */
  actionsStudentGroupDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsStudentGroupDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsStudentDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/student/delete`,
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
   * @param data undefined
   */
  actionsStudentDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsStudentDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsUserActiveUpdateResponse(data: ActionBooleanUpdate): __Observable<__StrictHttpResponse<ActionBooleanUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/actions/user/active`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ActionBooleanUpdate>;
      })
    );
  }
  /**
   * @param data undefined
   */
  actionsUserActiveUpdate(data: ActionBooleanUpdate): __Observable<ActionBooleanUpdate> {
    return this.actionsUserActiveUpdateResponse(data).pipe(
      __map(_r => _r.body as ActionBooleanUpdate)
    );
  }

  /**
   * @param data undefined
   */
  actionsUserDeleteDeleteResponse(data: IdsAction): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/actions/user/delete`,
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
   * @param data undefined
   */
  actionsUserDeleteDelete(data: IdsAction): __Observable<null> {
    return this.actionsUserDeleteDeleteResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  actionsUserPasswordUpdateResponse(data: UserUpdatePassword): __Observable<__StrictHttpResponse<UserUpdatePassword>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/actions/user/password`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserUpdatePassword>;
      })
    );
  }
  /**
   * @param data undefined
   */
  actionsUserPasswordUpdate(data: UserUpdatePassword): __Observable<UserUpdatePassword> {
    return this.actionsUserPasswordUpdateResponse(data).pipe(
      __map(_r => _r.body as UserUpdatePassword)
    );
  }
}

module ActionsService {
}

export { ActionsService }
