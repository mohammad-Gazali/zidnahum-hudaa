import { inject } from '@angular/core';
import {
  ActionsService,
  StudentsService,
} from '@shared';

export abstract class StudentsBase {
  protected students = inject(StudentsService);
  protected actions = inject(ActionsService);
}
