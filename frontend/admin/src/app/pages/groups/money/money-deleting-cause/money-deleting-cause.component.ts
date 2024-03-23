import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { MoneyBase } from '../money.base';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { MoneyDeletingCauseList } from '../../../../services/api/admin/models';

@Component({
  selector: 'app-money-deleting-cause',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './money-deleting-cause.component.html',
  styleUrl: './money-deleting-cause.component.scss'
})
export class MoneyDeletingCauseComponent extends MoneyBase {
  public config: TableComponentConfig<MoneyDeletingCauseList> = {
    hasPagination: false,
    createUrl: '/money/money-deleting-cause/create',
    dataFunc: options => this.money.moneyDeletingCauseList(options),
    getUrlFunc: id => `/money/money-deleting-cause/view/${id}`,
    columns: {
      name: {
        display: 'normal',
      },
    },
  };
}
