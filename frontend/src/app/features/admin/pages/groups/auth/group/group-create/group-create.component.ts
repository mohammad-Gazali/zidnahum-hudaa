import { Component } from '@angular/core';
import { CreateComponent, CreateComponentConfig } from '@admin/components';
import { GroupCreate } from '@shared';
import { AuthBase } from '../../auth.base';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-group-create',
  imports: [CreateComponent],
  templateUrl: './group-create.component.html',
  styleUrl: './group-create.component.scss',
})
export class GroupCreateComponent extends AuthBase {
  public config: CreateComponentConfig<GroupCreate> = {
    tableRoute: '/auth/group',
    createFunc: (body) => this.auth.authGroupCreate(body),
    fields: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
    },
  };
}
