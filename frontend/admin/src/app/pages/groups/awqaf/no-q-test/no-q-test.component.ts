import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { AwqafTestNoQList } from '../../../../services/api/admin/models';
import { AwqafBase } from '../awqaf.base';
import { deleteModelAction } from '../../../../common/delete-model-action';

@Component({
  selector: 'app-no-q-test',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './no-q-test.component.html',
  styleUrl: './no-q-test.component.scss',
})
export class NoQTestComponent extends AwqafBase {
  public config: TableComponentConfig<AwqafTestNoQList> = {
    hasPagination: false,
    dataFunc: (options) => this.awqaf.awqafTestNoQList(options),
    getUrlFunc: (id) => `/awqaf/no-q-test/view/${id}`,
    createUrl: `/awqaf/no-q-test/create`,
    actions: [
      deleteModelAction('أسبار الأوقاف بغير القرآن', (ids) =>
        this.actions.actionsAwqafTestNoQDeleteDelete({ ids })
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
