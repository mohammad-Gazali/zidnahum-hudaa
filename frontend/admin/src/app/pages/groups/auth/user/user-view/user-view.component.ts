import { Component } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { UserUpdate, UserDetails } from '../../../../../services/api/admin/models';
import { Validators } from '@angular/forms';
import { AuthBase } from '../../auth.base';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss'
})
export class UserViewComponent extends AuthBase {
  public config: ViewComponentConfig<UserDetails, UserUpdate> = {
    fieldsInfo: {
      username: {
        type: 'string',
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
      is_active: {
        type: 'boolean',
      },
      is_staff: {
        type: 'boolean',
      },
      is_superuser: {
        type: 'boolean',
      },
      groups: {
        type: 'relation',
        relationType: 'multiple',
        getFieldValueFunc: () => this.auth.authGroupList(),
        getUrlFunc: (id) => `/auth/group/view/${id}`,
      }
    },
    groupName: 'auth',
    itemNameAndRouteName: 'user',
    viewFunc: (id) => this.auth.authUserRead(id),
    deleteFunc: (id) => this.auth.authUserDelete(id),
    updateFunc: (id, data) => this.auth.authUserUpdate({ id, data }),
    extraAction: {
      name: 'Reset Password',
      icon: 'lock',
      link: (id) => `/auth/user/update-password/${id}`,
    }
  };
}
