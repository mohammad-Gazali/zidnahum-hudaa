import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CreateComponent, CreateComponentConfig } from '@admin/components';
import { PointsAddingCauseCreate } from '@shared';
import { PointsBase } from '../../points.base';

@Component({
  selector: 'app-adding-cause-create',
  imports: [CreateComponent],
  templateUrl: './adding-cause-create.component.html',
  styleUrl: './adding-cause-create.component.scss',
})
export class AddingCauseCreateComponent extends PointsBase {
  public config: CreateComponentConfig<PointsAddingCauseCreate> = {
    tableRoute: '/points/adding-cause',
    createFunc: (body) => this.points.pointsAddingCauseCreate(body),
    fields: {
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
