import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { ComingList } from '../../../../services/api/admin/models';
import { ComingsBase } from '../comings.base';
import { AuthService } from '../../../../services/api/admin/services';
import { map } from 'rxjs';

@Component({
  selector: 'app-coming',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './coming.component.html',
  styleUrl: './coming.component.scss'
})
export class ComingComponent extends ComingsBase {
  private auth = inject(AuthService);

  public config: TableComponentConfig<ComingList> = {
    hasPagination: true,
    getUrlFunc: id => `/comings/coming/view/${id}`,
    dataFunc: options => this.comings.comingsComingList(options),
    searchField: 'student_name', // here we added it like this because it will be converted to camelCase which will be converted to the right query param
    columns: {
      student: {
        display: 'link',
        stringField: 'student_name',
        getUrlFunc: id => `/students/student/view/${id}`,
      },
      student_name: {
        display: 'ignore',
      },
      category: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => this.comings.comingsCategoryList(),
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
              }))
            )
          ),
      },
      is_doubled: {
        display: 'boolean',
        filterType: 'boolean',
      },
    }
  }
}
