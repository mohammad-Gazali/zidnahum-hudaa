import { inject } from '@angular/core';
import {
  AdminPointsAddingService,
  AdminPointsDeletingService,
  AdminPointsAddingCauseService,
  AdminPointsDeletingCauseService,
} from '@shared';

export abstract class PointsBase {
  protected pointsAdding = inject(AdminPointsAddingService);
  protected pointsDeleting = inject(AdminPointsDeletingService);
  protected pointsAddingCause = inject(AdminPointsAddingCauseService);
  protected pointsDeletingCause = inject(AdminPointsDeletingCauseService);
}