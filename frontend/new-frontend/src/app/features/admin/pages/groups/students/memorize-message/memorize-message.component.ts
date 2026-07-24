import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { deleteModelAction } from '@admin/helpers';
import {
  MemorizeMessageList,
  UsersGroupsService,
  MemorizeMessageTypeService,
  LevelService,
} from '@shared';
import { StudentsBase } from '../students.base';

@Component({
  selector: 'app-memorize-message',
  imports: [TableComponent],
  templateUrl: './memorize-message.component.html',
  styleUrl: './memorize-message.component.scss',
})
export class MemorizeMessageComponent extends StudentsBase {
  private types = inject(MemorizeMessageTypeService);
  private auth = inject(UsersGroupsService);
  private level = inject(LevelService);

  public config: TableComponentConfig<MemorizeMessageList> = {
    hasPagination: true,
    useStudentMasjedFilter: true,
    dataFunc: (options) => this.students.studentsMemorizeMessageList(options),
    getUrlFunc: (id) => `/students/memorize-message/view/${id}`,
    searchField: 'student_name',
    actions: [
      deleteModelAction('رسائل التسميع', (ids) =>
        this.actions.actionsMemorizeMessageDeleteDelete({ ids }),
      ),
    ],
    columns: {
      student: {
        display: 'link',
        stringField: 'student_name',
        getUrlFunc: (id) => `/students/student/view/${id}`,
      },
      student_name: {
        display: 'ignore',
      },
      changes: {
        display: 'changes',
      },
      is_doubled: {
        display: 'boolean',
        filterType: 'boolean',
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
              })),
            ),
          ),
      },
      message_type: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => this.types.getTypes(),
      },
      sended_at: {
        display: 'normal',
        dateFormat: 'yyyy/MM/dd hh:mm a',
        filterType: 'datetime_date',
      },
      student_level: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => this.level.getLevels(),
      },
    },
  };
}
