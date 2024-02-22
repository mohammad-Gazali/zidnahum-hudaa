import { Component, inject } from '@angular/core';
import {
  MatListItemIcon,
  MatListModule,
} from '@angular/material/list';
import { GroupsService } from '../../services/groups.service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatListModule,
    MatListItemIcon,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  public groupsService = inject(GroupsService);
  public theme = inject(ThemeService);
  public router = inject(Router);
}
