import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CreateComponent, CreateComponentConfig } from '@admin/components';
import { AssetsCategoryCreate } from '@shared';
import { GlobalsBase } from '../../globals.base';

@Component({
  selector: 'app-assets-category-create',
  imports: [CreateComponent],
  templateUrl: './assets-category-create.component.html',
  styleUrl: './assets-category-create.component.scss',
})
export class AssetsCategoryCreateComponent extends GlobalsBase {
  public config: CreateComponentConfig<AssetsCategoryCreate> = {
    tableRoute: '/globals/assets-category',
    createFunc: (body) => this.globals.globalsAssetsCategoryCreate(body),
    fields: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
    },
  };
}
