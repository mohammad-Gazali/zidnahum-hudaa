import { Component, inject } from '@angular/core';
import { GroupsService } from '@admin/services';
import { HomeGroupComponent } from './group/group.component';

@Component({
  selector: 'app-admin-home',
  imports: [HomeGroupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public groupsService = inject(GroupsService);
}
