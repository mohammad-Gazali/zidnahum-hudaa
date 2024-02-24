/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UserUpdatePassword } from '../models/user-update-password';
@Injectable({
  providedIn: 'root',
})
class ActionsService extends __BaseService {
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
