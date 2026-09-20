import { Component } from '@angular/core';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { TotalMoneyList } from '@shared';
import { MoneyBase } from '../money.base';

@Component({
  selector: 'app-money-total',
  imports: [TableComponent],
  templateUrl: './money-total.component.html',
  styleUrl: './money-total.component.scss',
})
export class MoneyTotalComponent extends MoneyBase {
  protected config: TableComponentConfig<TotalMoneyList> = {
    hasPagination: true,
    dataFunc: (options) => this.moneyTotal.adminExtraTotalMoneyList(options),
    getUrlFunc: (id) => `/students/student/view/${id}`,
    searchField: 'student_name',
    useStudentMasjedFilter: true,
    columns: {
      name: { display: 'normal' },
      sum: { display: 'normal' },
    },
  };
}