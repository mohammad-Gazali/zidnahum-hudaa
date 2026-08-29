import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import {
  AssetsCategoryList,
  AssetsCategoryUpdate,
} from '@shared';
import { GlobalsBase } from '../../globals.base';

@Component({
  selector: 'app-assets-category-view',
  imports: [ViewComponent],
  templateUrl: './assets-category-view.component.html',
  styleUrl: './assets-category-view.component.scss',
})
export class AssetsCategoryViewComponent extends GlobalsBase {
  public config: ViewComponentConfig<AssetsCategoryList, AssetsCategoryUpdate> =
    {
      groupName: 'globals',
      itemNameAndRouteName: 'assets-category',
      viewFunc: (id) => this.globals.globalsAssetsCategoryRead(id),
      deleteFunc: (id) => this.globals.globalsAssetsCategoryDelete(id),
      updateFunc: (id, data) =>
        this.globals.globalsAssetsCategoryUpdate({ id, data }),
      fieldsInfo: {
        name: {
          type: 'string',
          validators: [Validators.required],
        },
      },
    };
}
