import { Component } from '@angular/core';
import { ComingsBase } from '../comings.base';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { ComingCategoryList } from '../../../../services/api/admin/models';

@Component({
  selector: 'app-coming-category',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './coming-category.component.html',
  styleUrl: './coming-category.component.scss'
})
export class ComingCategoryComponent extends ComingsBase {
  public config: TableComponentConfig<ComingCategoryList> = {
    createUrl: '/comings/coming-category/create',
    getUrlFunc: id => `/comings/coming-category/view/${id}`,
    dataFunc: (options) => this.comings.comingsCategoryList(options),
    hasPagination: false,
    columns: {
      name: {
        display: 'normal',
      },
      points: {
        display: 'normal',
      },
    },
  }
}
