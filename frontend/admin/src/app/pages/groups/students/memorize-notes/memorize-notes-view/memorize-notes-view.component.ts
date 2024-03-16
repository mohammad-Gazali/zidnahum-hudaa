import { Component, inject } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { StudentsBase } from '../../students.base';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { MemorizeNotesList } from '../../../../../services/api/admin/models';
import { AuthService } from '../../../../../services/api/admin/services';
import { map } from 'rxjs';

@Component({
  selector: 'app-memorize-notes-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './memorize-notes-view.component.html',
  styleUrl: './memorize-notes-view.component.scss'
})
export class MemorizeNotesViewComponent extends StudentsBase {
  private auth = inject(AuthService);

  public config: ViewComponentConfig<MemorizeNotesList> = {
    groupName: 'students',
    itemNameAndRouteName: 'memorize-notes',
    viewFunc: id => this.students.studentsMemorizeNotesRead(id),
    deleteFunc: id => this.students.studentsMemorizeNotesDelete(id),
    fieldsInfo: {
      sended_at: {
        type: 'datetime',
      },
      master: {
        type: 'relation',
        relationType: 'nullable',
        getFieldValueFunc: () => this.auth.authUserList().pipe(
          map((list) =>
            list.map((u) => ({
              id: u.id,
              name: String(u.first_name) + ' ' + String(u.last_name),
            }))
          )
        ),
      },
      student: {
        type: 'link',
        stringField: 'student_name',
        getUrlFunc: id => `/students/student/view/${id}`,
      },
      student_name: {
        type: 'ignore',
      },
      content: {
        type: 'string',
      }
    },
  }
}
