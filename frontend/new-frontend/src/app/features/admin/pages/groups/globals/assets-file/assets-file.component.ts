import { Component } from '@angular/core';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { deleteModelAction } from '@admin/helpers';
import { AssetFileList } from '@shared';
import { GlobalsBase } from '../globals.base';

@Component({
  selector: 'app-assets-file',
  imports: [TableComponent],
  templateUrl: './assets-file.component.html',
  styleUrl: './assets-file.component.scss',
})
export class AssetsFileComponent extends GlobalsBase {
  public config: TableComponentConfig<AssetFileList> = {
    hasPagination: true,
    createUrl: '/globals/assets-file/create',
    getUrlFunc: (id) => `/globals/assets-file/view/${id}`,
    dataFunc: (options) => this.globals.globalsAssetFileList(options),
    actions: [
      deleteModelAction('الملفات', (ids) =>
        this.actions.actionsAssetFileDeleteDelete({ ids }),
      ),
    ],
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
  };
}
