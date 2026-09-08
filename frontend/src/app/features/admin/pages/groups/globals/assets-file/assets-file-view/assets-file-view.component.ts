import { Component } from '@angular/core';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import { AssetFileList } from '@shared';
import { GlobalsBase } from '../../globals.base';

@Component({
  selector: 'app-assets-file-view',
  imports: [ViewComponent],
  templateUrl: './assets-file-view.component.html',
  styleUrl: './assets-file-view.component.scss',
})
export class AssetsFileViewComponent extends GlobalsBase {
  public config: ViewComponentConfig<AssetFileList> = {
    groupName: 'globals',
    itemNameAndRouteName: 'assets-file',
    viewFunc: (id) => this.globalsAssetFile.adminGlobalsAssetFileRetrieve(Number(id)),
    deleteFunc: (id) =>
      this.globalsAssetFile.adminActionsAssetFileDeleteCreate({
        ids: [Number(id)],
      }),
    fieldsInfo: {
      name: {
        type: 'string',
      },
      file: {
        type: 'file-link',
      },
      category: {
        type: 'relation',
        relationType: 'normal',
        getUrlFunc: (id) => `/globals/assets-category/view/${id}`,
        getFieldValueFunc: () =>
          this.globalsAssetsCategory.adminGlobalsAssetsCategoryList(),
      },
    },
  };
}
