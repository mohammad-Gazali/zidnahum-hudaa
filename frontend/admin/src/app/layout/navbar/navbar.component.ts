import {
  Component,
  OnDestroy,
  computed,
  inject,
  output,
  signal,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AccountsService } from '../../services/api/accounts/accounts.service';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

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
export class NavbarComponent implements OnDestroy {
  private accounts = inject(AccountsService);
  private router = inject(Router);
  public theme = inject(ThemeService);
  public breakpointObserver = inject(BreakpointObserver);
  public loading = inject(LoadingService).loading;

  public clickMenu = output();

  private destroyed$ = new Subject<void>();
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
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result) => {
        this.isSmall.set(result.matches);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
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
