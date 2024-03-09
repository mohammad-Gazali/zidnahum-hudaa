import { Component } from '@angular/core';
import { PointsBase } from '../../points.base';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { PointsDeletingCauseCreate } from '../../../../../services/api/admin/models';
import { CreateComponent } from '../../../../../shared/create/create.component';

@Component({
  selector: 'app-deleting-cause-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './deleting-cause-create.component.html',
  styleUrl: './deleting-cause-create.component.scss'
})
export class DeletingCauseCreateComponent extends PointsBase {
  public config: CreateComponentConfig<PointsDeletingCauseCreate> = {
    tableRoute: '/points/deleting-cause',
    createFunc: body => this.points.pointsDeletingCauseCreate(body),
    fields: {
      name: {
        type: 'string',
        required: true,
      }
    },
  }
}
