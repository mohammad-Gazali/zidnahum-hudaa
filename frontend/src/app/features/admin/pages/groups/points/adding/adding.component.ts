import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { deleteModelAction } from '@admin/helpers';
import { PointsAddingList, AdminUserService } from '@shared';
import { PointsBase } from '../points.base';

@Component({
  selector: 'app-adding',
  imports: [TableComponent],
  templateUrl: './adding.component.html',
  styleUrl: './adding.component.scss',
})
export class AddingComponent extends PointsBase {
  private auth = inject(AdminUserService);

  public config: TableComponentConfig<PointsAddingList> = {
    hasPagination: true,
    useStudentMasjedFilter: true,
    getUrlFunc: (id) => `/points/adding/view/${id}`,
    searchField: 'student_name', // here we added it like this because it will be converted to camelCase which will be converted to the right query param
    dataFunc: (options) => this.pointsAdding.adminPointsAddingList(options),
    actions: [
      deleteModelAction('الإضافات', (ids) =>
        this.pointsAdding.adminActionsPointsAddingDeleteCreate({ ids }),
      ),
    ],
    columns: {
      cause: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => this.pointsAddingCause.adminPointsAddingCauseList(),
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
