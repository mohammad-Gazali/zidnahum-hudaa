import { Component } from '@angular/core';
import { CreateComponent, CreateComponentConfig } from '@admin/components';
import { UserCreate } from '@shared';
import { AuthBase } from '../../auth.base';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  imports: [CreateComponent],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent extends AuthBase {
  public config: CreateComponentConfig<UserCreate> = {
    tableRoute: '/auth/user',
    createFunc: (body) => this.auth.authUserCreate(body),
    fields: {
      username: {
        type: 'string',
        validators: [Validators.required],
      },
      password: {
        type: 'password',
        validators: [Validators.required],
      },
      first_name: {
        type: 'string',
        validators: [Validators.required],
      },
      last_name: {
        type: 'string',
        validators: [Validators.required],
      },
      groups: {
        type: 'relation',
        relationType: 'multiple',
        getFieldValueFunc: () => this.auth.authGroupList(),
      },
      is_active: {
        type: 'boolean',
      },
      is_staff: {
        type: 'boolean',
      },
      is_superuser: {
        type: 'boolean',
      },
    },
  };
}
