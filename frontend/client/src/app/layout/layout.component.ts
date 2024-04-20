import { Component, inject } from '@angular/core';
import { AsyncPipe, Location } from '@angular/common';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatButton, MatIconButton } from '@angular/material/button';
import { LOADING } from '../services/loading.service';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: `./layout.component.scss`,
  imports: [
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatToolbar,
    MatIcon,
    MatButton,
    MatIconButton,
    MatProgressSpinner,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    MatListItemIcon,
    MatDivider,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [LayoutService],
})
export class LayoutComponent {
  public layout = inject(LayoutService);
  public loading = inject(LOADING);
  public router = inject(Router);
  public location = inject(Location);
}
