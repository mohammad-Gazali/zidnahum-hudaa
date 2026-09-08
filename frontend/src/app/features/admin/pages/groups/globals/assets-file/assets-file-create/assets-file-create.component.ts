import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CreateComponent, CreateComponentConfig } from '@admin/components';
import { AssetFileCreate } from '@shared';
import { GlobalsBase } from '../../globals.base';

@Component({
  selector: 'app-assets-file-create',
  imports: [CreateComponent],
  templateUrl: './assets-file-create.component.html',
  styleUrl: './assets-file-create.component.scss',
})
export class AssetsFileCreateComponent extends GlobalsBase {
  public config: CreateComponentConfig<AssetFileCreate> = {
    tableRoute: '/globals/assets-file',
    createFunc: (body) =>
      this.globalsAssetFile.adminGlobalsAssetFileCreate(body as any),
    fields: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
      category: {
        type: 'relation',
        relationType: 'normal',
        validators: [Validators.required],
        getFieldValueFunc: () =>
          this.globalsAssetsCategory.adminGlobalsAssetsCategoryList(),
      },
      file: {
        type: 'file',
        validators: [Validators.required],
      },
    },
  };
}
