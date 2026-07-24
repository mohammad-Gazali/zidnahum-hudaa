import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CreateComponent, CreateComponentConfig } from '@admin/components';
import { PointsDeletingCauseCreate } from '@shared';
import { PointsBase } from '../../points.base';

@Component({
  selector: 'app-deleting-cause-create',
  imports: [CreateComponent],
  templateUrl: './deleting-cause-create.component.html',
  styleUrl: './deleting-cause-create.component.scss',
})
export class DeletingCauseCreateComponent extends PointsBase {
  public config: CreateComponentConfig<PointsDeletingCauseCreate> = {
    tableRoute: '/points/deleting-cause',
    createFunc: (body) => this.points.pointsDeletingCauseCreate(body),
    fields: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
    },
  };
}
