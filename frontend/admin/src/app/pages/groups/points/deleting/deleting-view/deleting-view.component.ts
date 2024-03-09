import { Component, inject } from '@angular/core';
import { PointsBase } from '../../points.base';
import { AuthService } from '../../../../../services/api/admin/services';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { PointsDeletingList } from '../../../../../services/api/admin/models';
import { map } from 'rxjs';

@Component({
  selector: 'app-deleting-view',
  standalone: true,
  imports: [],
  templateUrl: './deleting-view.component.html',
  styleUrl: './deleting-view.component.scss',
})
export class DeletingViewComponent extends PointsBase {
  private auth = inject(AuthService);

  public config: ViewComponentConfig<PointsDeletingList> = {
    groupName: 'points',
    itemNameAndRouteName: 'deleting',
    viewFunc: (id) => this.points.pointsDeletingRead(id),
    deleteFunc: (id) => this.points.pointsDeletingDelete(id),
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
        getFieldValueFunc: () => this.points.pointsDeletingCauseList(),
      },
      master: {
        type: 'relation',
        relationType: 'normal',
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
