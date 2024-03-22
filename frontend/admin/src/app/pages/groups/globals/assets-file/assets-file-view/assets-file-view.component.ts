import { Component } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { AssetFileList } from '../../../../../services/api/admin/models';
import { GlobalsBase } from '../../globals.base';

@Component({
  selector: 'app-assets-file-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './assets-file-view.component.html',
  styleUrl: './assets-file-view.component.scss'
})
export class AssetsFileViewComponent extends GlobalsBase {
  public config: ViewComponentConfig<AssetFileList> = {
    groupName: 'globals',
    itemNameAndRouteName: 'assets-file',
    viewFunc: id => this.globals.globalsAssetFileRead(id),
    deleteFunc: id => this.globals.globalsAssetFileDelete(id),
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
        getUrlFunc: id => `/globals/assets-category/view/${id}`,
        getFieldValueFunc: () => this.globals.globalsAssetsCategoryList(),
      },
    },
  }
}
