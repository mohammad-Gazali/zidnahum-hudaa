import { Component } from '@angular/core';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import {
  GroupList,
  GroupUpdate,
} from '@shared';
import { Validators } from '@angular/forms';
import { AuthBase } from '../../auth.base';

@Component({
  selector: 'app-group-view',
  imports: [ViewComponent],
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.scss',
})
export class GroupViewComponent extends AuthBase {
  public config: ViewComponentConfig<GroupList, GroupUpdate> = {
    groupName: 'auth',
    itemNameAndRouteName: 'group',
    viewFunc: (id) => this.auth.authGroupRead(id),
    deleteFunc: (id) => this.auth.authGroupDelete(id),
    updateFunc: (id, data) => this.auth.authGroupUpdate({ id, data }),
    fieldsInfo: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
    },
  };
}
