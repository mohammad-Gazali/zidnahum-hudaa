import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AccountsService } from '../../services/api/accounts/accounts.service';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnDestroy {
  private accounts = inject(AccountsService);
  private router = inject(Router);
  public theme = inject(ThemeService);
  public breakpointObserver = inject(BreakpointObserver);

  private subscription: Subscription;
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
    this.subscription = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .subscribe((result) => {
        this.isSmall.set(result.matches);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
