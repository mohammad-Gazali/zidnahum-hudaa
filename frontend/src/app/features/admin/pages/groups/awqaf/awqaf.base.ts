import { inject } from '@angular/core';
import {
  AdminAwqafNoQStudentRelationService,
  AdminAwqafTestNoQService,
} from '@shared';

export abstract class AwqafBase {
  protected awqaf = inject(AdminAwqafTestNoQService);
  protected studentNoQRelation = inject(AdminAwqafNoQStudentRelationService);
}