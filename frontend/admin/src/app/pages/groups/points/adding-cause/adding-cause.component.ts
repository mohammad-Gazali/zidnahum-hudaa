import { Component } from '@angular/core';
import { PointsBase } from '../points.base';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { PointsAddingCauseList } from '../../../../services/api/admin/models';
import { deleteModelAction } from '../../../../common/delete-model-action';

@Component({
  selector: 'app-adding-cause',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './adding-cause.component.html',
  styleUrl: './adding-cause.component.scss'
})
export class AddingCauseComponent extends PointsBase {
  public config: TableComponentConfig<PointsAddingCauseList> = {
    hasPagination: false,
    createUrl: `/points/adding-cause/create`,
    getUrlFunc: id => `/points/adding-cause/view/${id}`,
    dataFunc: options => this.points.pointsAddingCauseList(options),
    actions: [
      deleteModelAction('أسباب الإضافات', (ids) =>
        this.actions.actionsPointsAddingCauseDeleteDelete({ ids })
      ),
    ],
    columns: {
      name: {
        display: 'normal',
      }
    },
  }
}
