import { Component, inject } from '@angular/core';
import { NewsList } from '../../../../../services/api/admin/models/news-list';
import { MasjedService } from '../../../../../services/masjed.service';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { GlobalsBase } from '../../globals.base';

@Component({
  selector: 'app-news-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './news-view.component.html',
  styleUrl: './news-view.component.scss'
})
export class NewsViewComponent extends GlobalsBase {
  private masjed = inject(MasjedService);

  public config: ViewComponentConfig<NewsList> = {
    groupName: 'globals',
    itemNameAndRouteName: 'news',
    viewFunc: id => this.globals.globalsNewsRead(id),
    deleteFunc: id => this.globals.globalsNewsDelete(id),
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
  }
}
