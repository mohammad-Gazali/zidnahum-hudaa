import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CreateComponent } from '../../../../../shared/create/create.component';
import { GlobalsBase } from '../../globals.base';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { AssetFileCreate } from '../../../../../services/api/admin/models';

@Component({
  selector: 'app-assets-file-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './assets-file-create.component.html',
  styleUrl: './assets-file-create.component.scss'
})
export class AssetsFileCreateComponent extends GlobalsBase {
  public config: CreateComponentConfig<AssetFileCreate> = {
    tableRoute: '/globals/assets-file',
    createFunc: body => this.globals.globalsAssetFileCreate(body as any),
    fields: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
      category: {
        type: 'relation',
        relationType: 'normal',
        validators: [Validators.required],
        getFieldValueFunc: () => this.globals.globalsAssetsCategoryList(),
      },
      file: {
        type: 'file',
        validators: [Validators.required],
      },
    },
  }
}
