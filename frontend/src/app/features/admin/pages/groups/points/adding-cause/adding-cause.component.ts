import { Component } from '@angular/core';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { deleteModelAction } from '@admin/helpers';
import { PointsAddingCauseList } from '@shared';
import { PointsBase } from '../points.base';

@Component({
  selector: 'app-adding-cause',
  imports: [TableComponent],
  templateUrl: './adding-cause.component.html',
  styleUrl: './adding-cause.component.scss',
})
export class AddingCauseComponent extends PointsBase {
  public config: TableComponentConfig<PointsAddingCauseList> = {
    hasPagination: false,
    createUrl: `/points/adding-cause/create`,
    getUrlFunc: (id) => `/points/adding-cause/view/${id}`,
    dataFunc: (options) => this.pointsAddingCause.adminPointsAddingCauseList(options),
    actions: [
      deleteModelAction('أسباب الإضافات', (ids) =>
        this.pointsAddingCause.adminActionsPointsAddingCauseDeleteCreate({ ids }),
      ),
    ],
    columns: {
      name: {
        display: 'normal',
      },
      maximum_limit: {
        display: 'normal',
      },
    },
  };
}
