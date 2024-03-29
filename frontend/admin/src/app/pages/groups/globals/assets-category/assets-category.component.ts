import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { AssetsCategoryList } from '../../../../services/api/admin/models';
import { GlobalsBase } from '../globals.base';
import { deleteModelAction } from '../../../../common/delete-model-action';

@Component({
  selector: 'app-assets-category',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './assets-category.component.html',
  styleUrl: './assets-category.component.scss'
})
export class AssetsCategoryComponent extends GlobalsBase {
  public config: TableComponentConfig<AssetsCategoryList> = {
    hasPagination: false,
    dataFunc: options => this.globals.globalsAssetsCategoryList(options),
    createUrl: '/globals/assets-category/create',
    getUrlFunc: id => `/globals/assets-category/view/${id}`,
    actions: [
      deleteModelAction('فئات الملفات', (ids) =>
        this.actions.actionsAssetsCategoryDeleteDelete({ ids })
      ),
    ],
    columns: {
      name: {
        display: 'normal',
      },
    },
  };
}
