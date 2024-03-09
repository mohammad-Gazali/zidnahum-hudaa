import { Component } from '@angular/core';
import { PointsBase } from '../../points.base';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { Validators } from '@angular/forms';
import { PointsDeletingCauseList, PointsDeletingCauseUpdate } from '../../../../../services/api/admin/models';
import { ViewComponent } from '../../../../../shared/view/view.component';

@Component({
  selector: 'app-deleting-cause-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './deleting-cause-view.component.html',
  styleUrl: './deleting-cause-view.component.scss'
})
export class DeletingCauseViewComponent extends PointsBase {
  public config: ViewComponentConfig<PointsDeletingCauseList, PointsDeletingCauseUpdate> = {
    groupName: 'points',
    itemNameAndRouteName: 'deleting-cause',
    viewFunc: (id) => this.points.pointsDeletingCauseRead(id),
    deleteFunc: (id) => this.points.pointsDeletingCauseDelete(id),
    updateFunc: (id, data) => this.points.pointsDeletingCauseUpdate({ id, data }),
    fieldsInfo: {
      name: {
        type: 'string',
        validators: [Validators.required],
      }  
    }
  };
}
