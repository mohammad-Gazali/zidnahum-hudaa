import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, Location } from '@angular/common';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { AuthService, CurrentUser, LayoutRoute, LayoutService } from '@shared';

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
    MatMenuModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
  ],
  providers: [LayoutService],
})
export class LayoutComponent {
  public auth = inject(AuthService);
  public layout = inject(LayoutService);
  public router = inject(Router);
  public location = inject(Location);

  public currentUser = this.auth.currentUser;

  public routes = computed<LayoutRoute[]>(() => {
    return this.layout.routes.filter(this.handleRoute(this.currentUser())).map(r => ({
      ...r,
      routes: r.routes?.filter(this.handleRoute(this.currentUser())),
    }));
  });

  public logout() {
    this.auth.logout();
  }

  private handleRoute(user: CurrentUser | null | undefined): (route: LayoutRoute) => boolean {
    return (route: LayoutRoute) => {
      if (route.nonAuthOnly) return !user;
      if (route.authOnly) return !!user;
      if (user?.isAdmin) return true;

      return !route.groups || !!route.groups?.some(g => user?.groups.indexOf(g) !== -1);
    };
  }
}
