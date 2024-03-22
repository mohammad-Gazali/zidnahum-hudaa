import { Component } from '@angular/core';
import { CreateComponent } from '../../../../../shared/create/create.component';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { AssetsCategoryCreate } from '../../../../../services/api/admin/models';
import { GlobalsBase } from '../../globals.base';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-assets-category-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './assets-category-create.component.html',
  styleUrl: './assets-category-create.component.scss'
})
export class AssetsCategoryCreateComponent extends GlobalsBase {
  public config: CreateComponentConfig<AssetsCategoryCreate> = {
    tableRoute: '/globals/assets-category',
    createFunc: body => this.globals.globalsAssetsCategoryCreate(body),
    fields: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
    },
  };
}
