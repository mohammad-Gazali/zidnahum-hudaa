import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import { AdminPointsaddingList, AdminUserService } from '@shared';
import { PointsBase } from '../../points.base';

@Component({
  selector: 'app-adding-view',
  imports: [ViewComponent],
  templateUrl: './adding-view.component.html',
  styleUrl: './adding-view.component.scss',
})
export class AddingViewComponent extends PointsBase {
  private auth = inject(AdminUserService);

  public config: ViewComponentConfig<AdminPointsaddingList> = {
    groupName: 'points',
    itemNameAndRouteName: 'adding',
    viewFunc: (id) => this.pointsAdding.adminPointsAddingRetrieve(Number(id)),
    deleteFunc: (id) =>
      this.pointsAdding.adminActionsPointsAddingDeleteCreate({ ids: [Number(id)] }),
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
        getUrlFunc: (id) => `/points/adding-cause/view/${id}`,
        getFieldValueFunc: () => this.pointsAddingCause.adminPointsAddingCauseList(),
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
