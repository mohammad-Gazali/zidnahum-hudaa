import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CreateComponent, CreateComponentConfig } from '@admin/components';
import { MoneyDeletingCauseCreate } from '@shared';
import { MoneyBase } from '../../money.base';

@Component({
  selector: 'app-money-deleting-cause-create',
  imports: [CreateComponent],
  templateUrl: './money-deleting-cause-create.component.html',
  styleUrl: './money-deleting-cause-create.component.scss',
})
export class MoneyDeletingCauseCreateComponent extends MoneyBase {
  public config: CreateComponentConfig<MoneyDeletingCauseCreate> = {
    tableRoute: '/money/money-deleting-cause',
    createFunc: (body) => this.money.moneyDeletingCauseCreate(body),
    fields: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
    },
  };
}
