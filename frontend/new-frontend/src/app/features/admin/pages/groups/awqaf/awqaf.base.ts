import { inject } from '@angular/core';
import {
  ActionsService,
  AwqafService,
} from '@shared';

export abstract class AwqafBase {
  protected awqaf = inject(AwqafService);
  protected actions = inject(ActionsService);
}
