import { Component, computed, inject } from '@angular/core';
import { AsyncPipe, Location } from '@angular/common';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatButton, MatIconButton } from '@angular/material/button';
import { LayoutService } from './layout.service';
import { AuthService } from '../services/auth.service';

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
    MatProgressBar,
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
  public auth = inject(AuthService);
  public layout = inject(LayoutService);
  public router = inject(Router);
  public location = inject(Location);

  public currentUser = this.auth.currentUser;

  public routes = computed(() => {
    return this.layout.routes.filter(route => {
      if (route.nonAuthOnly) return !this.currentUser();
      if (route.authOnly) return !!this.currentUser();

      return true;
    })
  });

  public logout() {
    this.auth.logout();
  }
}
