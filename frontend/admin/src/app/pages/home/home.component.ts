import { ChangeDetectionStrategy, Component } from '@angular/core';
import { groups } from './groups';
import { HomeGroupComponent } from './group/group.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeGroupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  groups = groups;
}
