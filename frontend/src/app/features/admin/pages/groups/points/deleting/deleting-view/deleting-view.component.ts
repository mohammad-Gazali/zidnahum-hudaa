import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { ViewComponentConfig } from '@admin/components';
import { PointsDeletingList, AdminUserService } from '@shared';
import { PointsBase } from '../../points.base';

@Component({
  selector: 'app-deleting-view',
  imports: [],
  templateUrl: './deleting-view.component.html',
  styleUrl: './deleting-view.component.scss',
})
export class DeletingViewComponent extends PointsBase {
  private auth = inject(AdminUserService);

  public config: ViewComponentConfig<PointsDeletingList> = {
    groupName: 'points',
    itemNameAndRouteName: 'deleting',
    viewFunc: (id) => this.pointsDeleting.adminPointsDeletingRetrieve(Number(id)),
    deleteFunc: (id) =>
      this.pointsDeleting.adminActionsPointsDeletingDeleteCreate({ ids: [Number(id)] }),
    fieldsInfo: {
      student: {
        type: 'link',
        stringField: 'student_name',
        getUrlFunc: (id) => `/students/sutdent/view/${id}`,
      },
      student_name: {
        type: 'ignore',
      },
      cause: {
        type: 'relation',
        relationType: 'normal',
        getUrlFunc: (id) => `/points/deleting-cause/view/${id}`,
        getFieldValueFunc: () => this.pointsDeletingCause.adminPointsDeletingCauseList(),
      },
      master: {
        type: 'relation',
        relationType: 'nullable',
        getUrlFunc: (id) => `/auth/user/view/${id}`,
        getFieldValueFunc: () =>
          this.auth.adminAuthUserList().pipe(
            map((list) =>
              list.map((user) => ({
                id: user.id,
                name: String(user.first_name) + ' ' + String(user.last_name),
              })),
            ),
          ),
      },
      value: {
        type: 'number',
      },
      created_at: {
        type: 'datetime',
        nonEditable: true,
      },
    },
  };
}
