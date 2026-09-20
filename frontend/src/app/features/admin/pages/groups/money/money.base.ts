import { inject } from '@angular/core';
import {
  AdminMoneyDeletingService,
  AdminMoneyDeletingCauseService,
  AdminMoneyTotalService,
} from '@shared';

export abstract class MoneyBase {
  protected money = inject(AdminMoneyDeletingService);
  protected moneyDeletingCause = inject(AdminMoneyDeletingCauseService);
  protected moneyTotal = inject(AdminMoneyTotalService);
}