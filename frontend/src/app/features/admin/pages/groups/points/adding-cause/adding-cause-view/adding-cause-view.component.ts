import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import {
  PointsAddingCauseList,
  PointsAddingCauseUpdate,
} from '@shared';
import { PointsBase } from '../../points.base';

@Component({
  selector: 'app-adding-cause-view',
  imports: [ViewComponent],
  templateUrl: './adding-cause-view.component.html',
  styleUrl: './adding-cause-view.component.scss',
})
export class AddingCauseViewComponent extends PointsBase {
  public config: ViewComponentConfig<
    PointsAddingCauseList,
    PointsAddingCauseUpdate
  > = {
    groupName: 'points',
    itemNameAndRouteName: 'adding-cause',
    viewFunc: (id) => this.points.pointsAddingCauseRead(id),
    deleteFunc: (id) => this.points.pointsAddingCauseDelete(id),
    updateFunc: (id, data) => this.points.pointsAddingCauseUpdate({ id, data }),
    fieldsInfo: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
      maximum_limit: {
        type: 'number',
        validators: [Validators.required],
      },
    },
  };
}
