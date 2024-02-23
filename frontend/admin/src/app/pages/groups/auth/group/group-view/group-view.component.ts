import { Component, inject } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { GroupList, GroupUpdate } from '../../../../../services/api/admin/models';
import { Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/api/admin/services';

@Component({
  selector: 'app-group-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.scss'
})
export class GroupViewComponent {
  private auth = inject(AuthService);

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
      }
    },
  };
}
