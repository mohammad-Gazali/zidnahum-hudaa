import { Component } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { GlobalsBase } from '../../globals.base';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { AssetsCategoryList, AssetsCategoryUpdate } from '../../../../../services/api/admin/models';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-assets-category-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './assets-category-view.component.html',
  styleUrl: './assets-category-view.component.scss'
})
export class AssetsCategoryViewComponent extends GlobalsBase {
  public config: ViewComponentConfig<AssetsCategoryList, AssetsCategoryUpdate> = {
    groupName: 'globals',
    itemNameAndRouteName: 'assets-category',
    viewFunc: id => this.globals.globalsAssetsCategoryRead(id),
    deleteFunc: id => this.globals.globalsAssetsCategoryDelete(id),
    updateFunc: (id, data) => this.globals.globalsAssetsCategoryUpdate({ id, data }),
    fieldsInfo: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
    },
  };
}
