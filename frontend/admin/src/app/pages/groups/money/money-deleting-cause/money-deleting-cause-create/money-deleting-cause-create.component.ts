import { Component } from '@angular/core';
import { CreateComponent } from '../../../../../shared/create/create.component';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { MoneyDeletingCauseCreate } from '../../../../../services/api/admin/models';
import { MoneyBase } from '../../money.base';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-money-deleting-cause-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './money-deleting-cause-create.component.html',
  styleUrl: './money-deleting-cause-create.component.scss'
})
export class MoneyDeletingCauseCreateComponent extends MoneyBase {
  public config: CreateComponentConfig<MoneyDeletingCauseCreate> = {
    tableRoute: '/money/money-deleting-cause',
    createFunc: body => this.money.moneyDeletingCauseCreate(body),
    fields: {
      name: {
        type: 'string',
        validators: [Validators.required],
      }
    },
  };
}
