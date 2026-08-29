import { Component } from '@angular/core';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { GroupList } from '@shared';
import { deleteModelAction } from '@admin/helpers';
import { AuthBase } from '../auth.base';

@Component({
  selector: 'app-group',
  imports: [TableComponent],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent extends AuthBase {
  public config: TableComponentConfig<GroupList> = {
    dataFunc: (options) => this.auth.authGroupList(options),
    getUrlFunc: (id) => `/auth/group/view/${id}`,
    hasPagination: false,
    createUrl: '/auth/group/create',
    actions: [
      deleteModelAction('المجموعات', (ids) =>
        this.actions.actionsGroupDeleteDelete({ ids }),
      ),
    ],
    columns: {
      name: {
        display: 'normal',
      },
    },
  };
}
