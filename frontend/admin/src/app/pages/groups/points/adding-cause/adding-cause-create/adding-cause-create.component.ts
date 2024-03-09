import { Component } from '@angular/core';
import { PointsBase } from '../../points.base';
import { CreateComponent } from '../../../../../shared/create/create.component';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { PointsAddingCauseCreate } from '../../../../../services/api/admin/models';

@Component({
  selector: 'app-adding-cause-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './adding-cause-create.component.html',
  styleUrl: './adding-cause-create.component.scss'
})
export class AddingCauseCreateComponent extends PointsBase {
  public config: CreateComponentConfig<PointsAddingCauseCreate> = {
    tableRoute: '/points/adding-cause',
    createFunc: body => this.points.pointsAddingCauseCreate(body),
    fields: {
      name: {
        type: 'string',
        required: true,
      }
    },
  }
}
