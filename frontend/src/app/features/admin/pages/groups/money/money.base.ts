import { inject } from '@angular/core';
import {
  ActionsService,
  MoneyService,
} from '@shared';

export abstract class MoneyBase {
  protected money = inject(MoneyService);
  protected actions = inject(ActionsService);
}
