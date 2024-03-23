import { Component } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { MoneyDeletingList } from '../../../../../services/api/admin/models';
import { MoneyBase } from '../../money.base';

@Component({
  selector: 'app-money-deleting-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './money-deleting-view.component.html',
  styleUrl: './money-deleting-view.component.scss'
})
export class MoneyDeletingViewComponent extends MoneyBase {
  public config: ViewComponentConfig<MoneyDeletingList> = {
    groupName: 'money',
    itemNameAndRouteName: 'money-deleting',
    viewFunc: id => this.money.moneyDeletingRead(id),
    fieldsInfo: {
      student: {
        type: 'link',
        getUrlFunc: id => `/students/student/view/${id}`,
        stringField: 'student_name',
      },
      student_name: {
        type: 'ignore',
      },
      cause: {
        type: 'relation',
        relationType: 'normal',
        getFieldValueFunc: () => this.money.moneyDeletingCauseList(),
        getUrlFunc: id => `/money/money-deleting-cause/view/${id}`,
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
  }
}
