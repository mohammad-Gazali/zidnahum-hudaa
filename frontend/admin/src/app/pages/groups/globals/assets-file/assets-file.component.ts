import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { AssetFileList } from '../../../../services/api/admin/models';
import { GlobalsBase } from '../globals.base';

@Component({
  selector: 'app-assets-file',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './assets-file.component.html',
  styleUrl: './assets-file.component.scss'
})
export class AssetsFileComponent extends GlobalsBase {

  public config: TableComponentConfig<AssetFileList> = {
    hasPagination: true,
    createUrl: '/globals/assets-file/create',
    getUrlFunc: id => `/globals/assets-file/view/${id}`,
    dataFunc: options => this.globals.globalsAssetFileList(options),
    columns: {
      name: {
        display: 'normal',
      },
      file: {
        display: 'file-link',
      },
      category: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => this.globals.globalsAssetsCategoryList(),
      },
    },
  }
}
