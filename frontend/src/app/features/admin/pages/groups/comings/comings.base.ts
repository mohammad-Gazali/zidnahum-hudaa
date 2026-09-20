import { inject } from '@angular/core';
import {
  AdminComingCategoryService,
  AdminComingService,
} from '@shared';

export abstract class ComingsBase {
  protected comings = inject(AdminComingService);
  protected category = inject(AdminComingCategoryService);
}