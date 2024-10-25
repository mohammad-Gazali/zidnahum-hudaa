import { Component, inject, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatNavList,
} from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { GroupsService } from '../../services/groups.service';
import { MatDivider } from '@angular/material/divider';
import { AccountsService } from '../../services/api/accounts/accounts.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
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
  public userDetails = inject(AccountsService).details

  close() {
    this.onItemClick.emit();
  }
}
