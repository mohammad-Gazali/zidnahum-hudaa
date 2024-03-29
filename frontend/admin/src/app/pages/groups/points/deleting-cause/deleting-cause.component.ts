import { Component } from '@angular/core';
import { PointsBase } from '../points.base';
import { PointsDeletingCauseList } from '../../../../services/api/admin/models';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { TableComponent } from '../../../../shared/table/table.component';
import { deleteModelAction } from '../../../../common/delete-model-action';

@Component({
  selector: 'app-deleting-cause',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './deleting-cause.component.html',
  styleUrl: './deleting-cause.component.scss'
})
export class DeletingCauseComponent extends PointsBase {
  public config: TableComponentConfig<PointsDeletingCauseList> = {
    hasPagination: false,
    createUrl: `/points/deleting-cause/create`,
    getUrlFunc: id => `/points/deleting-cause/view/${id}`,
    dataFunc: options => this.points.pointsDeletingCauseList(options),
    actions: [
      deleteModelAction('أسباب الإضافات', (ids) =>
        this.actions.actionsPointsDeletingCauseDeleteDelete({ ids })
      ),
    ],
    columns: {
      name: {
        display: 'normal',
      }
    },
  }
}
