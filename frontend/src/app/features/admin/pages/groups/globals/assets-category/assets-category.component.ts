import { Component } from '@angular/core';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { deleteModelAction } from '@admin/helpers';
import { AssetsCategoryList } from '@shared';
import { GlobalsBase } from '../globals.base';

@Component({
  selector: 'app-assets-category',
  imports: [TableComponent],
  templateUrl: './assets-category.component.html',
  styleUrl: './assets-category.component.scss',
})
export class AssetsCategoryComponent extends GlobalsBase {
  public config: TableComponentConfig<AssetsCategoryList> = {
    hasPagination: false,
    dataFunc: (options) =>
      this.globalsAssetsCategory.adminGlobalsAssetsCategoryList(options),
    createUrl: '/globals/assets-category/create',
    getUrlFunc: (id) => `/globals/assets-category/view/${id}`,
    actions: [
      deleteModelAction('فئات الملفات', (ids) =>
        this.globalsAssetsCategory.adminActionsAssetsCategoryDeleteCreate({
          ids,
        }),
      ),
    ],
    columns: {
      name: {
        display: 'normal',
      },
    },
  };
}
