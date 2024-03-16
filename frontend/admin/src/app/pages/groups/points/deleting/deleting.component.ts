import { Component, inject } from '@angular/core';
import { PointsBase } from '../points.base';
import { AuthService } from '../../../../services/api/admin/services';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { PointsDeletingList } from '../../../../services/api/admin/models';
import { map } from 'rxjs';

@Component({
  selector: 'app-deleting',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './deleting.component.html',
  styleUrl: './deleting.component.scss'
})
export class DeletingComponent extends PointsBase {
  private auth = inject(AuthService);

  public config: TableComponentConfig<PointsDeletingList> = {
    hasPagination: true,
    useStudentMasjedFilter: true,
    getUrlFunc: (id) => `/points/deleting/view/${id}`,
    searchField: 'student_name', // here we added it like this because it will be converted to camelCase which will be converted to the right query param
    dataFunc: (options) => this.points.pointsDeletingList(options),
    columns: {
      cause: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => this.points.pointsDeletingCauseList(),
      },
      created_at: {
        display: 'normal',
        filterType: 'datetime_date',
        dateFormat: 'yyyy/MM/dd hh:mm a'
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
              }))
            )
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
