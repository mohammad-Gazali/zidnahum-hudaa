import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import {
  MoneyDeletingCauseList,
  MoneyDeletingCauseUpdate,
} from '@shared';
import { MoneyBase } from '../../money.base';

@Component({
  selector: 'app-money-deleting-cause-view',
  imports: [ViewComponent],
  templateUrl: './money-deleting-cause-view.component.html',
  styleUrl: './money-deleting-cause-view.component.scss',
})
export class MoneyDeletingCauseViewComponent extends MoneyBase {
  public config: ViewComponentConfig<
    MoneyDeletingCauseList,
    MoneyDeletingCauseUpdate
  > = {
    groupName: 'money',
    itemNameAndRouteName: 'money-deleting-cause',
    viewFunc: (id) => this.money.moneyDeletingCauseRead(id),
    deleteFunc: (id) => this.money.moneyDeletingCauseDelete(id),
    updateFunc: (id, data) => this.money.moneyDeletingCauseUpdate({ id, data }),
    fieldsInfo: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
    },
  };
}
