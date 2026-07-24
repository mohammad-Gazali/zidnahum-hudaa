import { Component, inject } from '@angular/core';
import { deleteModelAction } from '@admin';
import { NewsList } from '@shared';
import { MasjedService } from '@shared';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { GlobalsBase } from '../globals.base';

@Component({
  selector: 'app-news',
  imports: [TableComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent extends GlobalsBase {
  private masjed = inject(MasjedService);

  public config: TableComponentConfig<NewsList> = {
    hasPagination: true,
    createUrl: '/globals/news/create',
    getUrlFunc: (id) => `/globals/news/view/${id}`,
    dataFunc: (options) => this.globals.globalsNewsList(options),
    actions: [
      deleteModelAction('الإعلانات', (ids) =>
        this.actions.actionsNewsDeleteDelete({ ids }),
      ),
    ],
    columns: {
      title: {
        display: 'normal',
      },
      main_image: {
        display: 'file-link',
      },
      masjed: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => {
          return this.masjed.getMasjeds();
        },
      },
      description: {
        display: 'ignore',
      },
      low_quality_image: {
        display: 'ignore',
      },
    },
  };
}
