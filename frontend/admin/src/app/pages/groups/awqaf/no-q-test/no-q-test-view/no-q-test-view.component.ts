import { Component } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { AwqafBase } from '../../awqaf.base';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { AwqafTestNoQList, AwqafTestNoQUpdate } from '../../../../../services/api/admin/models';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-no-q-test-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './no-q-test-view.component.html',
  styleUrl: './no-q-test-view.component.scss'
})
export class NoQTestViewComponent extends AwqafBase {
  public config: ViewComponentConfig<AwqafTestNoQList, AwqafTestNoQUpdate> = {
    groupName: 'awqaf',
    itemNameAndRouteName: 'no-q-test',
    viewFunc: id => this.awqaf.awqafTestNoQRead(id),
    deleteFunc: id => this.awqaf.awqafTestNoQDelete(id),
    updateFunc: (id, data) => this.awqaf.awqafTestNoQUpdate({ id, data }),
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
