import { inject } from '@angular/core';
import {
  ActionsService,
  PointsService,
} from '@shared';

export abstract class PointsBase {
  protected points = inject(PointsService);
  protected actions = inject(ActionsService);
}
