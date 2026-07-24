import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { deleteModelAction } from '@admin/helpers';
import { ComingList, UsersGroupsService } from '@shared';
import { ComingsBase } from '../comings.base';

@Component({
  selector: 'app-coming',
  imports: [TableComponent],
  templateUrl: './coming.component.html',
  styleUrl: './coming.component.scss',
})
export class ComingComponent extends ComingsBase {
  private auth = inject(UsersGroupsService);

  public config: TableComponentConfig<ComingList> = {
    hasPagination: true,
    useStudentMasjedFilter: true,
    getUrlFunc: (id) => `/comings/coming/view/${id}`,
    dataFunc: (options) => this.comings.comingsComingList(options),
    searchField: 'student_name', // here we added it like this because it will be converted to camelCase which will be converted to the right query param
    actions: [
      deleteModelAction('تسجيلات الحضور', (ids) =>
        this.actions.actionsComingDeleteDelete({ ids }),
      ),
    ],
    columns: {
      student: {
        display: 'link',
        stringField: 'student_name',
        getUrlFunc: (id) => `/students/student/view/${id}`,
      },
      student_name: {
        display: 'ignore',
      },
      category: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => this.comings.comingsCategoryList(),
      },
      masjed: {
        display: 'ignore',
      },
      registered_at: {
        display: 'normal',
        filterType: 'datetime_date',
        dateFormat: 'yyyy/MM/dd hh:mm a',
      },
      master: {
        display: 'relation',
        filterType: 'exact_null',
        getFieldValueFunc: () =>
          this.auth.authUserList().pipe(
            map((list) =>
              list.map((u) => ({
                id: u.id,
                name: String(u.first_name) + ' ' + String(u.last_name),
              })),
            ),
          ),
      },
      is_doubled: {
        display: 'boolean',
        filterType: 'boolean',
      },
    },
  };
}
