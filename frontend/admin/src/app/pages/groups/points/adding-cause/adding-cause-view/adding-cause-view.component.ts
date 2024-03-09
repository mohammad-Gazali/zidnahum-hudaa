import { Component } from '@angular/core';
import { PointsBase } from '../../points.base';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { PointsAddingCauseList, PointsAddingCauseUpdate } from '../../../../../services/api/admin/models';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-adding-cause-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './adding-cause-view.component.html',
  styleUrl: './adding-cause-view.component.scss'
})
export class AddingCauseViewComponent extends PointsBase {
  public config: ViewComponentConfig<PointsAddingCauseList, PointsAddingCauseUpdate> = {
    groupName: 'points',
    itemNameAndRouteName: 'adding-cause',
    viewFunc: (id) => this.points.pointsAddingCauseRead(id),
    deleteFunc: (id) => this.points.pointsAddingCauseDelete(id),
    updateFunc: (id, data) => this.points.pointsAddingCauseUpdate({ id, data }),
    fieldsInfo: {
      name: {
        type: 'string',
        validators: [Validators.required],
      }  
    }
  };
}
