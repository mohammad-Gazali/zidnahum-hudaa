import { Component } from '@angular/core';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import { MoneyDeletingList } from '@shared';
import { MoneyBase } from '../../money.base';

@Component({
  selector: 'app-money-deleting-view',
  imports: [ViewComponent],
  templateUrl: './money-deleting-view.component.html',
  styleUrl: './money-deleting-view.component.scss',
})
export class MoneyDeletingViewComponent extends MoneyBase {
  public config: ViewComponentConfig<MoneyDeletingList> = {
    groupName: 'money',
    itemNameAndRouteName: 'money-deleting',
    viewFunc: (id) => this.money.moneyDeletingRead(id),
    fieldsInfo: {
      student: {
        type: 'link',
        getUrlFunc: (id) => `/students/student/view/${id}`,
        stringField: 'student_name',
      },
      student_name: {
        type: 'ignore',
      },
      cause: {
        type: 'relation',
        relationType: 'normal',
        getFieldValueFunc: () => this.money.moneyDeletingCauseList(),
        getUrlFunc: (id) => `/money/money-deleting-cause/view/${id}`,
      },
      value: {
        type: 'number',
      },
      active_to_points: {
        type: 'boolean',
      },
      created_at: {
        type: 'datetime',
      },
    },
  };
}
