import { inject } from '@angular/core';
import {
  ActionsService,
  ComingsService,
} from '@shared';

export abstract class ComingsBase {
  protected comings = inject(ComingsService);
  protected actions = inject(ActionsService);
}
