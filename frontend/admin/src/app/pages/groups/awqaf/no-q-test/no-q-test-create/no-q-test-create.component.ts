import { Component } from '@angular/core';
import { CreateComponent } from '../../../../../shared/create/create.component';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { AwqafTestNoQCreate } from '../../../../../services/api/admin/models';
import { Validators } from '@angular/forms';
import { AwqafBase } from '../../awqaf.base';

@Component({
  selector: 'app-no-q-test-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './no-q-test-create.component.html',
  styleUrl: './no-q-test-create.component.scss'
})
export class NoQTestCreateComponent extends AwqafBase {
  public config: CreateComponentConfig<AwqafTestNoQCreate> = {
    tableRoute: '/awqaf/no-q-test',
    createFunc: body => this.awqaf.awqafTestNoQCreate(body),
    fields: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
      points: {
        type: 'number',
        validators: [Validators.required, Validators.min(1)],
      },
    },
  };
}
