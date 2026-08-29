import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CreateComponent, CreateComponentConfig } from '@admin/components';
import { AwqafTestNoQCreate } from '@shared';
import { AwqafBase } from '../../awqaf.base';

@Component({
  selector: 'app-no-q-test-create',
  imports: [CreateComponent],
  templateUrl: './no-q-test-create.component.html',
  styleUrl: './no-q-test-create.component.scss',
})
export class NoQTestCreateComponent extends AwqafBase {
  public config: CreateComponentConfig<AwqafTestNoQCreate> = {
    tableRoute: '/awqaf/no-q-test',
    createFunc: (body) => this.awqaf.awqafTestNoQCreate(body),
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
