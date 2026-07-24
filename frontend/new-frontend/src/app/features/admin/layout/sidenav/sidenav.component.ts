import { Component, inject, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatNavList,
} from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { GroupsService } from '@admin';
import { MatDivider } from '@angular/material/divider';
import { AuthService } from '@shared';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatNavList,
    MatListItem,
    MatListItemTitle,
    MatListItemIcon,
    MatIcon,
    MatDivider,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  public groupsService = inject(GroupsService);
  public onItemClick = output();
  public userDetails = inject(AuthService).currentUser;

  close() {
    this.onItemClick.emit();
  }
}
