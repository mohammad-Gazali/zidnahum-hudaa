import { Component, inject } from '@angular/core';
import { StudentsBase } from '../students.base';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { MemorizeNotesList } from '../../../../services/api/admin/models';
import { AuthService } from '../../../../services/api/admin/services';
import { map } from 'rxjs';

@Component({
  selector: 'app-memorize-notes',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './memorize-notes.component.html',
  styleUrl: './memorize-notes.component.scss',
})
export class MemorizeNotesComponent extends StudentsBase {
  private auth = inject(AuthService);

  public config: TableComponentConfig<MemorizeNotesList> = {
    hasPagination: true,
    useStudentMasjedFilter: true,
    dataFunc: options => this.students.studentsMemorizeNotesList(options).pipe(
      // here we reduce the content displayed size
      map(res => ({
        ...res,
        results: res.results.map(note => ({
          ...note,
          content: note.content.length >= 30 ? note.content.slice(0, 27) + '...' : note.content,
        }))
      })),
    ),
    getUrlFunc: id => `/students/memorize-notes/view/${id}`,
    searchField: 'student_name', // here we added it like this because it will be converted to camelCase which will be converted to the right query param
    columns: {
      student: {
        display: 'link',
        stringField: 'student_name',
        getUrlFunc: id => `/students/student/view/${id}`,
      },
      student_name: {
        display: 'ignore',
      },
      content: {
        display: 'normal',
      },
      sended_at: {
        display: 'normal',
        filterType: 'datetime_date',
        dateFormat: 'yyyy/MM/dd hh:mm a'
      },
      master: {
        display: 'relation',
        filterType: 'exact_null',
        getFieldValueFunc: () =>
          this.auth.authUserList().pipe(
            map((list) =>
              list.map((u) => ({
                id: u.id,
                name: String(u.first_name) + ' ' + String(u.last_name),
              }))
            )
          ),
      },
    },
  };
}
