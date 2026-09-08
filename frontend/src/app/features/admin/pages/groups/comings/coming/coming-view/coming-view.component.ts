import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import { AdminComingList, AdminUserService } from '@shared';
import { ComingsBase } from '../../comings.base';

@Component({
  selector: 'app-coming-view',
  imports: [ViewComponent],
  templateUrl: './coming-view.component.html',
  styleUrl: './coming-view.component.scss',
})
export class ComingViewComponent extends ComingsBase {
  private auth = inject(AdminUserService);

  public config: ViewComponentConfig<AdminComingList> = {
    groupName: 'comings',
    itemNameAndRouteName: 'coming',
    viewFunc: (id) => this.comings.adminComingsComingRetrieve(Number(id)),
    deleteFunc: (id) => this.comings.adminComingsComingDestroy(Number(id)),
    fieldsInfo: {
      student: {
        type: 'link',
        getUrlFunc: (id) => `/students/student/view/${id}`,
        stringField: 'student_name',
      },
      student_name: {
        type: 'ignore',
      },
      is_doubled: {
        type: 'boolean',
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
      registered_at: {
        type: 'datetime',
      },
      category: {
        type: 'relation',
        relationType: 'normal',
        getFieldValueFunc: () => this.category.adminComingsCategoryList(),
        getUrlFunc: (id) => `/comings/coming-category/view/${id}`,
      },
    },
  };
}
