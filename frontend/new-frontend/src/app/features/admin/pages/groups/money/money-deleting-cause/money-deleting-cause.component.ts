import { Component } from '@angular/core';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { deleteModelAction } from '@admin/helpers';
import { MoneyDeletingCauseList } from '@shared';
import { MoneyBase } from '../money.base';

@Component({
  selector: 'app-money-deleting-cause',
  imports: [TableComponent],
  templateUrl: './money-deleting-cause.component.html',
  styleUrl: './money-deleting-cause.component.scss',
})
export class MoneyDeletingCauseComponent extends MoneyBase {
  public config: TableComponentConfig<MoneyDeletingCauseList> = {
    hasPagination: false,
    createUrl: '/money/money-deleting-cause/create',
    dataFunc: (options) => this.money.moneyDeletingCauseList(options),
    getUrlFunc: (id) => `/money/money-deleting-cause/view/${id}`,
    actions: [
      deleteModelAction('أسباب الغرامات المالية', (ids) =>
        this.actions.actionsMoneyDeletingCauseDeleteDelete({ ids }),
      ),
    ],
    columns: {
      name: {
        display: 'normal',
      },
    },
  };
}
