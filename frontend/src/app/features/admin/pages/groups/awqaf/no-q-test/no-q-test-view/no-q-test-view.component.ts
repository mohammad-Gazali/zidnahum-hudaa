import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import {
  AwqafTestNoQList,
  AwqafTestNoQUpdate,
} from '@shared';
import { AwqafBase } from '../../awqaf.base';

@Component({
  selector: 'app-no-q-test-view',
  imports: [ViewComponent],
  templateUrl: './no-q-test-view.component.html',
  styleUrl: './no-q-test-view.component.scss',
})
export class NoQTestViewComponent extends AwqafBase {
  public config: ViewComponentConfig<AwqafTestNoQList, AwqafTestNoQUpdate> = {
    groupName: 'awqaf',
    itemNameAndRouteName: 'no-q-test',
    viewFunc: (id) => this.awqaf.adminAwqafTestNoQRetrieve(Number(id)),
    deleteFunc: (id) => this.awqaf.adminAwqafTestNoQDestroy(Number(id)),
    updateFunc: (id, data) => this.awqaf.adminAwqafTestNoQUpdate(Number(id), data),
    fieldsInfo: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
      points: {
        type: 'number',
        validators: [Validators.min(1)],
      },
    },
  };
}
