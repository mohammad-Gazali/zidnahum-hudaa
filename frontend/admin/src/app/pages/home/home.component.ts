import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HomeGroupComponent } from './group/group.component';
import { GroupsService } from '../../services/groups.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeGroupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  public groupsService = inject(GroupsService);
}
