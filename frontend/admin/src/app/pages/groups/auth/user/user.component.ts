import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { UserList } from '../../../../services/api/admin/models';
import { AuthBase } from '../auth.base';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent extends AuthBase {
  public config: TableComponentConfig<UserList> = {
    createUrl: '/auth/user/create',
    hasPagination: false,
    getUrlFunc: (id) => `/auth/user/view/${id}`,
    dataFunc: (options) => this.auth.authUserList(options),
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
  }
}
