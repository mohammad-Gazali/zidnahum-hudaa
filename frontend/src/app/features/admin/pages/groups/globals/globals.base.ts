import { inject } from '@angular/core';
import {
  ActionsService,
  GlobalsService,
} from '@shared';

export abstract class GlobalsBase {
  protected globals = inject(GlobalsService);
  protected actions = inject(ActionsService);
}
