import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { MoneyBase } from '../money.base';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { MoneyDeletingList } from '../../../../services/api/admin/models';

@Component({
  selector: 'app-money-deleting',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './money-deleting.component.html',
  styleUrl: './money-deleting.component.scss'
})
export class MoneyDeletingComponent extends MoneyBase {
  public config: TableComponentConfig<MoneyDeletingList> = {
    hasPagination: true,
    useStudentMasjedFilter: true,
    searchField: 'student_name',
    dataFunc: options => this.money.moneyDeletingList(options),
    getUrlFunc: id => `/money/money-deleting/view/${id}`,
    actions: [
      {
        name: 'active-to-points-true',
        delegateFunc: ids => this.actions.actionsMoneyDeletingActiveUpdate({ ids, value: true }),
        confirmation: {
          message: 'هل أنت متأكد من جعل الغرامات مخصومة من النقاط ؟',
        },
      },
      {
        name: 'active-to-points-false',
        delegateFunc: ids => this.actions.actionsMoneyDeletingActiveUpdate({ ids, value: false }),
        confirmation: {
          message: 'هل أنت متأكد من جعل الغرامات غير مخصومة من النقاط ؟',
        },
      },
    ],
    columns: {
      student: {
        display: 'link',
        stringField: 'student_name',
        getUrlFunc: id => `/students/student/view/${id}`,
      },
      student_name: {
        display: 'ignore',
      },
      cause: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => this.money.moneyDeletingCauseList(),
      },
      value: {
        display: 'normal',
      },
      created_at: {
        display: 'normal',
        filterType: 'datetime_date',
        dateFormat: 'yyyy/MM/dd hh:mm a',
      },
      active_to_points: {
        display: 'boolean',
        filterType: 'boolean',
      },
    },
  };
}
