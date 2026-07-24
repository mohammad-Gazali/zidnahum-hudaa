import { AsyncPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatNavList,
} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBar } from '@angular/material/progress-bar';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService, CurrentUser, LayoutService } from '@shared';
import { ClientRoutesService, ClientRoute } from '@client/services';
import { HomeStudentListService } from '../pages/home/home-student-list.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
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
    MatMenuModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatAnchor,
    RouterOutlet,
  ],
  providers: [ClientRoutesService],
})
export class LayoutComponent {
  private studentsList = inject(HomeStudentListService);
  protected auth = inject(AuthService);
  protected clientRoutes = inject(ClientRoutesService);
  protected router = inject(Router);
  protected layout = inject(LayoutService);

  protected currentUser = this.auth.currentUser;

  protected routes = computed<ClientRoute[]>(() => {
    return this.clientRoutes.routes
      .filter(this.handleRoute(this.currentUser()))
      .map((r) => ({
        ...r,
        routes: r.routes?.filter(this.handleRoute(this.currentUser())),
      }));
  });

  protected logout() {
    this.auth.logout();
  }

  private handleRoute(
    user: CurrentUser | null | undefined,
  ): (route: ClientRoute) => boolean {
    return (route: ClientRoute) => {
      if (route.nonAuthOnly) return !user;
      if (route.authOnly) return !!user;
      if (user?.isAdmin) return true;

      return (
        !route.groups ||
        !!route.groups?.some((g) => user?.groups.indexOf(g) !== -1)
      );
    };
  }

  protected clickLogo() {
    this.router.navigateByUrl('/');
    this.studentsList.lastResponse.set(undefined);
  }
}
