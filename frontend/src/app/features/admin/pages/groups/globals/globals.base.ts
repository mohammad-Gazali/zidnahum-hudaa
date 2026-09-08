import { inject } from '@angular/core';
import {
  AdminAssetsCategoryService,
  AdminAssetFileService,
  AdminNewsService,
} from '@shared';

export abstract class GlobalsBase {
  protected globalsAssetsCategory = inject(AdminAssetsCategoryService);
  protected globalsAssetFile = inject(AdminAssetFileService);
  protected globalsNews = inject(AdminNewsService);
}