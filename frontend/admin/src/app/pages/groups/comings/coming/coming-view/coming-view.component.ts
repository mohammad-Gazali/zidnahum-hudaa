import { Component, inject } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ComingsBase } from '../../comings.base';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { ComingList } from '../../../../../services/api/admin/models';
import { AuthService } from '../../../../../services/api/admin/services';
import { map } from 'rxjs';

@Component({
  selector: 'app-coming-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './coming-view.component.html',
  styleUrl: './coming-view.component.scss'
})
export class ComingViewComponent extends ComingsBase {
  private auth = inject(AuthService);

  public config: ViewComponentConfig<ComingList> = {
    groupName: 'comings',
    itemNameAndRouteName: 'coming',
    viewFunc: id => this.comings.comingsComingRead(id),
    deleteFunc: id => this.comings.comingsComingDelete(id),
    fieldsInfo: {
      student: {
        type: 'link',
        getUrlFunc: id => `/students/student/view/${id}`,
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
          this.auth.authUserList().pipe(
            map((list) =>
              list.map((user) => ({
                id: user.id,
                name: String(user.first_name) + ' ' + String(user.last_name),
              }))
            )
          ),
      },
      registered_at: {
        type: 'datetime',
      },
      category: {
        type: 'relation',
        relationType: 'normal',
        getFieldValueFunc: () => this.comings.comingsCategoryList(),
        getUrlFunc: id => `/comings/coming-category/view/${id}`,
      }
    },
  }
}
