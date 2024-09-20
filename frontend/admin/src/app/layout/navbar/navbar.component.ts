import {
  Component,
  computed,
  inject,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor, MatButton, MatIconAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AccountsService } from '../../services/api/accounts/accounts.service';
import { LOADING } from '../../tokens/loading.token';

@Component({
  selector: 'app-navbar',
  standalone: true,
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
  private accounts = inject(AccountsService);
  private router = inject(Router);
  public breakpointObserver = inject(BreakpointObserver);
  public loading = inject(LOADING);

  public clickMenu = output();
  public userDetails = this.accounts.details;

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
    localStorage.removeItem('zidnahum-token');
    localStorage.removeItem('zidnahum-refresh-token');
    this.accounts.details.set(null);
    this.router.navigateByUrl('login');
  }
}
