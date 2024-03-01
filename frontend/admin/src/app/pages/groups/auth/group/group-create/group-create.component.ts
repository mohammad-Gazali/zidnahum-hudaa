import { Component } from '@angular/core';
import { CreateComponent } from '../../../../../shared/create/create.component';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { GroupCreate } from '../../../../../services/api/admin/models';
import { AuthBase } from '../../auth.base';

@Component({
  selector: 'app-group-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './group-create.component.html',
  styleUrl: './group-create.component.scss'
})
export class GroupCreateComponent extends AuthBase {
  public config: CreateComponentConfig<GroupCreate> = {
    tableRoute: '/auth/group',
    createFunc: (body) => this.auth.authGroupCreate(body),
    fields: {
      name: {
        type: 'string',
        required: true,
      }
    },
  }
}
