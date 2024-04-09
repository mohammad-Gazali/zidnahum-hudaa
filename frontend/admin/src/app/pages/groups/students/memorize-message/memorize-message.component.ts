import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { TableComponent } from '../../../../shared/table/table.component';
import { StudentsBase } from '../students.base';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { MemorizeMessageList } from '../../../../services/api/admin/models';
import { AuthService } from '../../../../services/api/admin/services';
import { deleteModelAction } from '../../../../common/delete-model-action';
import { MemorizeMessageTypeService } from '../../../../services/memorize-message-type.service';


@Component({
  selector: 'app-memorize-message',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './memorize-message.component.html',
  styleUrl: './memorize-message.component.scss'
})
export class MemorizeMessageComponent extends StudentsBase {
  private types = inject(MemorizeMessageTypeService);
  private auth = inject(AuthService);

  public config: TableComponentConfig<MemorizeMessageList> = {
    hasPagination: true,
    useStudentMasjedFilter: true,
    dataFunc: options => this.students.studentsMemorizeMessageList(options),
    getUrlFunc: id => `/students/memorize-message/view/${id}`,
    searchField: 'student_name',
    actions: [
      deleteModelAction('رسائل التسميع', (ids) =>
        this.actions.actionsMemorizeMessageDeleteDelete({ ids })
      ),
    ],
    columns: {
      student: {
        display: 'link',
        stringField: 'student_name',
        getUrlFunc: id => `/students/student/view/${id}`,
      },
      student_name: {
        display: 'ignore',
      },
      changes: {
        display: 'changes',
      },
      is_doubled: {
        display: 'boolean',
        filterType: 'boolean'
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
      message_type: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => this.types.getTypes(),
      },
      sended_at: {
        display: 'normal',
        dateFormat: 'yyyy/MM/dd hh:mm a',
        filterType: 'datetime_date'
      },
    },
  };
}
