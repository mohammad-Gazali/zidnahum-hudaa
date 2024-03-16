import { Component } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ComingsBase } from '../../comings.base';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { ComingCategoryList, ComingCategoryUpdate } from '../../../../../services/api/admin/models';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-coming-category-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './coming-category-view.component.html',
  styleUrl: './coming-category-view.component.scss'
})
export class ComingCategoryViewComponent extends ComingsBase {
  public config: ViewComponentConfig<ComingCategoryList, ComingCategoryUpdate> = {
    groupName: 'comings',
    itemNameAndRouteName: 'coming-category',
    viewFunc: id => this.comings.comingsCategoryRead(id),
    deleteFunc: id => this.comings.comingsCategoryDelete(id),
    updateFunc: (id, data) => this.comings.comingsCategoryUpdate({ id, data }),
    fieldsInfo: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
      points: {
        type: 'number',
        validators: [Validators.required, Validators.min(0)],
      },
    },
  }
}
