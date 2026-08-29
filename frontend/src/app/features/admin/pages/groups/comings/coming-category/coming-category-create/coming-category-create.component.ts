import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CreateComponent, CreateComponentConfig } from '@admin/components';
import { ComingCategoryCreate } from '@shared';
import { ComingsBase } from '../../comings.base';

@Component({
  selector: 'app-coming-category-create',
  imports: [CreateComponent],
  templateUrl: './coming-category-create.component.html',
  styleUrl: './coming-category-create.component.scss',
})
export class ComingCategoryCreateComponent extends ComingsBase {
  public config: CreateComponentConfig<ComingCategoryCreate> = {
    tableRoute: '/comings/coming-category',
    createFunc: (body) => this.comings.comingsCategoryCreate(body),
    fields: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
      points: {
        type: 'number',
        validators: [Validators.required, Validators.min(1)],
      },
    },
  };
}
