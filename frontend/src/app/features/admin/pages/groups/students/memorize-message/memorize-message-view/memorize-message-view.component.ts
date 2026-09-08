import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import {
  MemorizeMessageList,
  AdminUserService,
  MemorizeMessageTypeService,
  LevelService,
} from '@shared';
import { StudentsBase } from '../../students.base';

@Component({
  selector: 'app-memorize-message-view',
  imports: [ViewComponent],
  templateUrl: './memorize-message-view.component.html',
  styleUrl: './memorize-message-view.component.scss',
})
export class MemorizeMessageViewComponent extends StudentsBase {
  private auth = inject(AdminUserService);
  private types = inject(MemorizeMessageTypeService);
  private level = inject(LevelService);

  public config: ViewComponentConfig<MemorizeMessageList> = {
    groupName: 'students',
    itemNameAndRouteName: 'memorize-message',
    viewFunc: (id) => this.memorizeMessage.adminStudentsMemorizeMessageRetrieve(Number(id)),
    deleteFunc: (id) =>
      this.memorizeMessage.adminActionsMemorizeMessageDeleteCreate({ ids: [Number(id)] }),
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
          this.auth.adminAuthUserList().pipe(
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
