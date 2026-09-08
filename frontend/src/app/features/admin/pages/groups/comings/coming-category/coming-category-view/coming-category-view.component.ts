import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import {
  ComingCategoryList,
  ComingCategoryUpdate,
} from '@shared';
import { ComingsBase } from '../../comings.base';

@Component({
  selector: 'app-coming-category-view',
  imports: [ViewComponent],
  templateUrl: './coming-category-view.component.html',
  styleUrl: './coming-category-view.component.scss',
})
export class ComingCategoryViewComponent extends ComingsBase {
  public config: ViewComponentConfig<ComingCategoryList, ComingCategoryUpdate> =
    {
      groupName: 'comings',
      itemNameAndRouteName: 'coming-category',
      viewFunc: (id) => this.category.adminComingsCategoryRetrieve(Number(id)),
      deleteFunc: (id) => this.category.adminComingsCategoryDestroy(Number(id)),
      updateFunc: (id, data) =>
        this.category.adminComingsCategoryUpdate(Number(id), data),
      fieldsInfo: {
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
