import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { GroupsService } from '@admin/services';

type Group = GroupsService['groups'][number];
import { AuthService } from '@shared';

@Component({
  selector: 'app-home-group',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatDivider,
    RouterLink,
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class HomeGroupComponent {
  protected userDetails = inject(AuthService).currentUser;
  public group = input.required<Group>();
}
