import { Component, inject } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { MemorizeMessageList } from '@shared';
import { map } from 'rxjs';
import { StudentsBase } from '../../students.base';
import { UsersGroupsService } from '@shared';
import { MemorizeMessageTypeService } from '@shared';
import { LevelService } from '@shared';

@Component({
  selector: 'app-memorize-message-view',
  imports: [ViewComponent],
  templateUrl: './memorize-message-view.component.html',
  styleUrl: './memorize-message-view.component.scss',
})
export class MemorizeMessageViewComponent extends StudentsBase {
  private auth = inject(UsersGroupsService);
  private types = inject(MemorizeMessageTypeService);
  private level = inject(LevelService);

  public config: ViewComponentConfig<MemorizeMessageList> = {
    groupName: 'students',
    itemNameAndRouteName: 'memorize-message',
    viewFunc: (id) => this.students.studentsMemorizeMessageRead(id),
    deleteFunc: (id) => this.students.studentsMemorizeMessageDelete(id),
    fieldsInfo: {
      student: {
        type: 'link',
        stringField: 'student_name',
        getUrlFunc: (id) => `/students/student/view/${id}`,
      },
      student_name: {
        type: 'ignore',
      },
      changes: {
        type: 'changes',
      },
      is_doubled: {
        type: 'boolean',
      },
      master: {
        type: 'relation',
        relationType: 'nullable',
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
        type: 'relation',
        relationType: 'normal',
        getFieldValueFunc: () => this.types.getTypes(),
      },
      sended_at: {
        type: 'datetime',
      },
      student_level: {
        type: 'relation',
        relationType: 'normal',
        getFieldValueFunc: () => this.level.getLevels(),
      },
    },
  };
}
