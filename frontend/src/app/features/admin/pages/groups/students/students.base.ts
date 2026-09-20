import { inject } from '@angular/core';
import {
  AdminStudentService,
  AdminStudentCategoryService,
  AdminStudentGroupService,
  AdminMemorizeMessageService,
  AdminMemorizeNotesService,
} from '@shared';

export abstract class StudentsBase {
  protected students = inject(AdminStudentService);
  protected studentsCategory = inject(AdminStudentCategoryService);
  protected studentsGroup = inject(AdminStudentGroupService);
  protected memorizeMessage = inject(AdminMemorizeMessageService);
  protected memorizeNotes = inject(AdminMemorizeNotesService);
}