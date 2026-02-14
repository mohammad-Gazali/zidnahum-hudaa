import { Component, inject } from '@angular/core';
import { HomeGroupComponent } from './group/group.component';
import { GroupsService } from '../../services/groups.service';


@Component({
    selector: 'app-home',
    imports: [HomeGroupComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  public groupsService = inject(GroupsService);
}
