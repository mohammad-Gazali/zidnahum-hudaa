import { Component, inject } from '@angular/core';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import { NewsList, MasjedService } from '@shared';
import { GlobalsBase } from '../../globals.base';

@Component({
  selector: 'app-news-view',
  imports: [ViewComponent],
  templateUrl: './news-view.component.html',
  styleUrl: './news-view.component.scss',
})
export class NewsViewComponent extends GlobalsBase {
  private masjed = inject(MasjedService);

  public config: ViewComponentConfig<NewsList> = {
    groupName: 'globals',
    itemNameAndRouteName: 'news',
    viewFunc: (id) => this.globals.globalsNewsRead(id),
    deleteFunc: (id) => this.globals.globalsNewsDelete(id),
    fieldsInfo: {
      title: {
        type: 'string',
      },
      main_image: {
        type: 'file-link',
      },
      low_quality_image: {
        type: 'file-link',
      },
      description: {
        type: 'string',
      },
      masjed: {
        type: 'relation',
        relationType: 'normal',
        getFieldValueFunc: () => {
          return this.masjed.getMasjeds();
        },
      },
    },
  };
}
