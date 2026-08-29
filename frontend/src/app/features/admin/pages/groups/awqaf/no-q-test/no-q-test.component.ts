import { Component } from '@angular/core';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { deleteModelAction } from '@admin/helpers';
import { AwqafTestNoQList } from '@shared';
import { AwqafBase } from '../awqaf.base';

@Component({
  selector: 'app-no-q-test',
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
        this.actions.actionsAwqafTestNoQDeleteDelete({ ids }),
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
