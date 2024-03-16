import { Component } from '@angular/core';
import { CreateComponent } from '../../../../../shared/create/create.component';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { ComingCategoryCreate } from '../../../../../services/api/admin/models';
import { ComingsBase } from '../../comings.base';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-coming-category-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './coming-category-create.component.html',
  styleUrl: './coming-category-create.component.scss'
})
export class ComingCategoryCreateComponent extends ComingsBase {
  public config: CreateComponentConfig<ComingCategoryCreate> = {
    tableRoute: '/comings/coming-category',
    createFunc: body => this.comings.comingsCategoryCreate(body),
    fields: {
      name: {
        type: 'string',
        validators: [Validators.required]
      },
      points: {
        type: 'number',
        validators: [Validators.required, Validators.min(0)],
      },
    },
  }
}
