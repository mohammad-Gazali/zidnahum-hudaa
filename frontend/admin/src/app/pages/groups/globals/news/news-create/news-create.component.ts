import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { CreateComponent } from '../../../../../shared/create/create.component';
import { GlobalsBase } from '../../globals.base';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { NewsCreate } from '../../../../../services/api/admin/models/news-create';
import { MasjedService } from '../../../../../services/masjed.service';

@Component({
  selector: 'app-news-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './news-create.component.html',
  styleUrl: './news-create.component.scss'
})
export class NewsCreateComponent extends GlobalsBase {
  private masjed = inject(MasjedService);

  public config: CreateComponentConfig<NewsCreate> = {
    tableRoute: '/globals/news',
    createFunc: body => this.globals.globalsNewsCreate(body as any),
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
  }
}
