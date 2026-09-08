import { Component } from '@angular/core';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { deleteModelAction } from '@admin/helpers';
import { PointsDeletingCauseList } from '@shared';
import { PointsBase } from '../points.base';

@Component({
  selector: 'app-deleting-cause',
  imports: [TableComponent],
  templateUrl: './deleting-cause.component.html',
  styleUrl: './deleting-cause.component.scss',
})
export class DeletingCauseComponent extends PointsBase {
  public config: TableComponentConfig<PointsDeletingCauseList> = {
    hasPagination: false,
    createUrl: `/points/deleting-cause/create`,
    getUrlFunc: (id) => `/points/deleting-cause/view/${id}`,
    dataFunc: (options) => this.pointsDeletingCause.adminPointsDeletingCauseList(options),
    actions: [
      deleteModelAction('أسباب الإضافات', (ids) =>
        this.pointsDeletingCause.adminActionsPointsDeletingCauseDeleteCreate({ ids }),
      ),
    ],
    columns: {
      name: {
        display: 'normal',
      },
    },
  };
}
