import { Component } from '@angular/core';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { deleteModelAction } from '@admin/helpers';
import { UserList } from '@shared';
import { AuthBase } from '../auth.base';

@Component({
  selector: 'app-user',
  imports: [TableComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent extends AuthBase {
  public config: TableComponentConfig<UserList> = {
    createUrl: '/auth/user/create',
    hasPagination: false,
    getUrlFunc: (id) => `/auth/user/view/${id}`,
    dataFunc: (options) => this.auth.authUserList(options),
    actions: [
      deleteModelAction('المستخدمين', (ids) =>
        this.actions.actionsUserDeleteDelete({ ids }),
      ),
      {
        name: 'activate-users',
        delegateFunc: (ids) =>
          this.actions.actionsUserActiveUpdate({ ids, value: true }),
      },
      {
        name: 'decativate-users',
        delegateFunc: (ids) =>
          this.actions.actionsUserActiveUpdate({ ids, value: false }),
      },
    ],
    columns: {
      username: {
        display: 'normal',
      },
      first_name: {
        display: 'normal',
      },
      last_name: {
        display: 'normal',
      },
      is_active: {
        display: 'boolean',
      },
      is_staff: {
        display: 'boolean',
      },
      is_superuser: {
        display: 'boolean',
      },
    },
  };
}
