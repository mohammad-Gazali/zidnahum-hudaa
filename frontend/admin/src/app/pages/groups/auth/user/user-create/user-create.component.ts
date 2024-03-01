import { Component } from '@angular/core';
import { CreateComponent } from '../../../../../shared/create/create.component';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { UserCreate } from '../../../../../services/api/admin/models';
import { AuthBase } from '../../auth.base';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent extends AuthBase {
  public config: CreateComponentConfig<UserCreate> = {
    tableRoute: '/auth/user',
    createFunc: (body) => this.auth.authUserCreate(body),
    fields: {
      username: {
        type: 'string',
        required: true,
      },
      password: {
        type: 'password',
        required: true,
      },
      first_name: {
        type: 'string',
        required: true,
      },
      last_name: {
        type: 'string',
        required: true,
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
