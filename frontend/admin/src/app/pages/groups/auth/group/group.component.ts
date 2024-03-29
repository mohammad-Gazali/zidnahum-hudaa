import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { GroupList } from '../../../../services/api/admin/models';
import { AuthBase } from '../auth.base';
import { deleteModelAction } from '../../../../common/delete-model-action';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent extends AuthBase {
  public config: TableComponentConfig<GroupList> = {
    dataFunc: (options) => this.auth.authGroupList(options),
    getUrlFunc: (id) => `/auth/group/view/${id}`,
    hasPagination: false,
    createUrl: '/auth/group/create',
    actions: [
      deleteModelAction('المجموعات', (ids) =>
        this.actions.actionsGroupDeleteDelete({ ids })
      ),
    ],
    columns: {
      name: {
        display: 'normal',
      }
    },
  };
}
