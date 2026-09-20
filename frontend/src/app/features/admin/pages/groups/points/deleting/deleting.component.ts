import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { AdminUserService } from '@shared';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { deleteModelAction } from '@admin/helpers';
import { PointsDeletingList } from '@shared';
import { PointsBase } from '../points.base';

@Component({
  selector: 'app-deleting',
  imports: [TableComponent],
  templateUrl: './deleting.component.html',
  styleUrl: './deleting.component.scss',
})
export class DeletingComponent extends PointsBase {
  private auth = inject(AdminUserService);

  public config: TableComponentConfig<PointsDeletingList> = {
    hasPagination: true,
    useStudentMasjedFilter: true,
    getUrlFunc: (id) => `/points/deleting/view/${id}`,
    searchField: 'student_name', // here we added it like this because it will be converted to camelCase which will be converted to the right query param
    dataFunc: (options) => this.pointsDeleting.adminPointsDeletingList(options),
    actions: [
      deleteModelAction('الخصومات', (ids) =>
        this.pointsDeleting.adminActionsPointsDeletingDeleteCreate({ ids }),
      ),
    ],
    columns: {
      cause: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => this.pointsDeletingCause.adminPointsDeletingCauseList(),
      },
      created_at: {
        display: 'normal',
        filterType: 'datetime_date',
        dateFormat: 'yyyy/MM/dd hh:mm a',
      },
      master: {
        display: 'relation',
        filterType: 'exact_null',
        getFieldValueFunc: () =>
          this.auth.adminAuthUserList().pipe(
            map((list) =>
              list.map((u) => ({
                id: u.id,
                name: String(u.first_name) + ' ' + String(u.last_name),
              })),
            ),
          ),
      },
      student: {
        display: 'link',
        stringField: 'student_name',
        getUrlFunc: (id) => `/students/student/view/${id}`,
      },
      student_name: {
        display: 'ignore',
      },
      value: {
        display: 'normal',
      },
    },
  };
}
