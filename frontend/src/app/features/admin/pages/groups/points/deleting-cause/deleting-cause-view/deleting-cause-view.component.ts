import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import {
  PointsDeletingCauseList,
  PointsDeletingCauseUpdate,
} from '@shared';
import { PointsBase } from '../../points.base';

@Component({
  selector: 'app-deleting-cause-view',
  imports: [ViewComponent],
  templateUrl: './deleting-cause-view.component.html',
  styleUrl: './deleting-cause-view.component.scss',
})
export class DeletingCauseViewComponent extends PointsBase {
  public config: ViewComponentConfig<
    PointsDeletingCauseList,
    PointsDeletingCauseUpdate
  > = {
    groupName: 'points',
    itemNameAndRouteName: 'deleting-cause',
    viewFunc: (id) => this.pointsDeletingCause.adminPointsDeletingCauseRetrieve(Number(id)),
    deleteFunc: (id) =>
      this.pointsDeletingCause.adminActionsPointsDeletingCauseDeleteCreate({ ids: [Number(id)] }),
    updateFunc: (id, data) =>
      this.pointsDeletingCause.adminPointsDeletingCauseUpdate(Number(id), data),
    fieldsInfo: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
    },
  };
}
