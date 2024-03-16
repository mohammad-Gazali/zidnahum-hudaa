import { Component, inject } from '@angular/core';
import { PointsBase } from '../../points.base';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { PointsAddingList } from '../../../../../services/api/admin/models';
import { AuthService } from '../../../../../services/api/admin/services';
import { map } from 'rxjs';

@Component({
  selector: 'app-adding-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './adding-view.component.html',
  styleUrl: './adding-view.component.scss'
})
export class AddingViewComponent extends PointsBase {
  private auth = inject(AuthService);

  public config: ViewComponentConfig<PointsAddingList> = {
    groupName: 'points',
    itemNameAndRouteName: 'adding',
    viewFunc: id => this.points.pointsAddingRead(id),
    deleteFunc: id => this.points.pointsAddingDelete(id),
    fieldsInfo: {
      student: {
        type: 'link',
        stringField: 'student_name',
        getUrlFunc: id => `/students/sutdent/view/${id}`,
      },
      student_name: {
        type: 'ignore',
      },
      cause: {
        type: 'relation',
        relationType: 'normal',
        getUrlFunc: id => `/points/adding-cause/view/${id}`,
        getFieldValueFunc: () => this.points.pointsAddingCauseList(),
      },
      master: {
        type: 'relation',
        relationType: 'nullable',
        getUrlFunc: id => `/auth/user/view/${id}`,
        getFieldValueFunc: () => this.auth.authUserList().pipe(map(list => list.map(user => ({
          id: user.id,
          name: String(user.first_name) + " " + String(user.last_name),
        }))))
      },
      value: {
        type: 'number',
      },
      created_at: {
        type: 'datetime',
        nonEditable: true,
      },
    },
  }
}
