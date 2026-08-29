import { Component } from '@angular/core';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { deleteModelAction } from '@admin/helpers';
import { ComingCategoryList } from '@shared';
import { ComingsBase } from '../comings.base';

@Component({
  selector: 'app-coming-category',
  imports: [TableComponent],
  templateUrl: './coming-category.component.html',
  styleUrl: './coming-category.component.scss',
})
export class ComingCategoryComponent extends ComingsBase {
  public config: TableComponentConfig<ComingCategoryList> = {
    createUrl: '/comings/coming-category/create',
    getUrlFunc: (id) => `/comings/coming-category/view/${id}`,
    dataFunc: (options) => this.comings.comingsCategoryList(options),
    hasPagination: false,
    actions: [
      deleteModelAction('أسباب الحضور', (ids) =>
        this.actions.actionsComingCategoryDeleteDelete({ ids }),
      ),
    ],
    columns: {
      name: {
        display: 'normal',
      },
      points: {
        display: 'normal',
      },
    },
  };
}
