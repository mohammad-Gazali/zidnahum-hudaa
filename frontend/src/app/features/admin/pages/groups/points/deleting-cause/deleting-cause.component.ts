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
    dataFunc: (options) => this.points.pointsDeletingCauseList(options),
    actions: [
      deleteModelAction('أسباب الإضافات', (ids) =>
        this.actions.actionsPointsDeletingCauseDeleteDelete({ ids }),
      ),
    ],
    columns: {
      name: {
        display: 'normal',
      },
    },
  };
}
