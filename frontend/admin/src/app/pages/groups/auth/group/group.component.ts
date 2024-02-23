import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { GroupList } from '../../../../services/api/admin/models';
import { AuthService } from '../../../../services/api/admin/services';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent {
  private auth = inject(AuthService);

  public config: TableComponentConfig<GroupList> = {
    dataFunc: (options) => this.auth.authGroupList(options),
    getUrlFunc: (id) => `/auth/group/view/${id}`,
    hasPagination: false,
    createUrl: '/auth/group/create',
    columns: {
      name: {
        display: 'normal',
      }
    },
  };
}
