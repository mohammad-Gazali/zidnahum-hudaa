import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { CreateComponent, CreateComponentConfig } from '@admin/components';
import { NewsCreate, MasjedService } from '@shared';
import { GlobalsBase } from '../../globals.base';

@Component({
  selector: 'app-news-create',
  imports: [CreateComponent],
  templateUrl: './news-create.component.html',
  styleUrl: './news-create.component.scss',
})
export class NewsCreateComponent extends GlobalsBase {
  private masjed = inject(MasjedService);

  public config: CreateComponentConfig<NewsCreate> = {
    tableRoute: '/globals/news',
    createFunc: (body) => this.globals.globalsNewsCreate(body as any),
    fields: {
      title: {
        type: 'string',
        validators: [Validators.required],
      },
      description: {
        type: 'string',
      },
      masjed: {
        type: 'relation',
        relationType: 'normal',
        validators: [Validators.required],
        getFieldValueFunc: () => {
          return this.masjed.getMasjeds();
        },
      },
      main_image: {
        type: 'file',
        validators: [Validators.required],
      },
      low_quality_image: {
        type: 'file',
        validators: [Validators.required],
      },
    },
  };
}
