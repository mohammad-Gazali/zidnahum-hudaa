import { Component, inject } from '@angular/core';
import { PointsBase } from '../points.base';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { PointsAddingList } from '@shared';
import { UsersGroupsService } from '@shared';
import { map } from 'rxjs';
import { deleteModelAction } from '@admin';

@Component({
  selector: 'app-adding',
  imports: [TableComponent],
  templateUrl: './adding.component.html',
  styleUrl: './adding.component.scss',
})
export class AddingComponent extends PointsBase {
  private auth = inject(UsersGroupsService);

  public config: TableComponentConfig<PointsAddingList> = {
    hasPagination: true,
    useStudentMasjedFilter: true,
    getUrlFunc: (id) => `/points/adding/view/${id}`,
    searchField: 'student_name', // here we added it like this because it will be converted to camelCase which will be converted to the right query param
    dataFunc: (options) => this.points.pointsAddingList(options),
    actions: [
      deleteModelAction('الإضافات', (ids) =>
        this.actions.actionsPointsAddingDeleteDelete({ ids }),
      ),
    ],
    columns: {
      cause: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => this.points.pointsAddingCauseList(),
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
          this.auth.authUserList().pipe(
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
