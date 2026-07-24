import { Component, computed, inject, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatToolbar } from '@angular/material/toolbar';
import {
  MatAnchor,
  MatButton,
  MatIconAnchor,
  MatIconButton,
} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@shared';
import { AuthService } from '@shared';
import { LOADING } from '@shared';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbar,
    MatButton,
    MatIconButton,
    MatIcon,
    MatProgressBar,
    TranslatePipe,
    RouterLink,
    MatIconAnchor,
    MatAnchor,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  public breakpointObserver = inject(BreakpointObserver);
  public loading = inject(LOADING);

  public clickMenu = output();
  public userDetails = this.auth.currentUser;

  public title = computed(() => {
    if (this.isSmall()) {
      return 'Zidnahum Hudaa';
    }
    return 'Zidnahum Hudaa Dashboard';
  });
  public isSmall = signal(false);
  public isAuth = computed(() => {
    return this.auth.currentUser() !== null;
  });

  constructor() {
    this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        this.isSmall.set(result.matches);
      });
  }

  logout() {
    this.auth.logout();
  }
}
