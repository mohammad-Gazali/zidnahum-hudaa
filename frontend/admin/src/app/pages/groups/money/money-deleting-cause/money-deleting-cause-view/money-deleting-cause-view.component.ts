import { Component } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { MoneyBase } from '../../money.base';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { MoneyDeletingCauseList, MoneyDeletingCauseUpdate } from '../../../../../services/api/admin/models';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-money-deleting-cause-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './money-deleting-cause-view.component.html',
  styleUrl: './money-deleting-cause-view.component.scss'
})
export class MoneyDeletingCauseViewComponent extends MoneyBase {
  public config: ViewComponentConfig<MoneyDeletingCauseList, MoneyDeletingCauseUpdate> = {
    groupName: 'money',
    itemNameAndRouteName: 'money-deleting-cause',
    viewFunc: id => this.money.moneyDeletingCauseRead(id),
    deleteFunc: id => this.money.moneyDeletingCauseDelete(id),
    updateFunc: (id, data) => this.money.moneyDeletingCauseUpdate({ id, data }),
    fieldsInfo: {
      name: {
        type: 'string',
        validators: [Validators.required],
      }
    },
  };
}
