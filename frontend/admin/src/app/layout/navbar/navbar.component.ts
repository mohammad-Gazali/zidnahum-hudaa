import {
  Component,
  OnDestroy,
  computed,
  inject,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AccountsService } from '../../services/api/accounts/accounts.service';
import { ThemeService } from '../../services/theme.service';
import { LOADING } from '../../tokens/loading.token';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    TranslatePipe,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private accounts = inject(AccountsService);
  private router = inject(Router);
  public theme = inject(ThemeService);
  public breakpointObserver = inject(BreakpointObserver);
  public loading = inject(LOADING);

  public clickMenu = output();

  public title = computed(() => {
    if (this.isSmall()) {
      return 'Zidnahum Hudaa';
    }
    return 'Zidnahum Hudaa Dashboard';
  });
  public isSmall = signal(false);
  public isAuth = computed(() => {
    return this.accounts.details() !== null;
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
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    this.accounts.details.set(null);
    this.router.navigateByUrl('login');
  }

  toggleTheme() {
    this.theme.setDarkMode(!this.theme.isDarkMode());
  }
}
