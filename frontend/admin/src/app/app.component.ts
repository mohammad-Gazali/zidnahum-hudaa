import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LayoutComponent } from './layout/layout.component';
import { AccountsService } from './services/api/accounts/accounts.service';
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, MatProgressSpinner],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private accounts = inject(AccountsService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);

  public loading = this.accounts.loading;

  constructor() {
    document.documentElement.addEventListener('keydown', (e) => {
      if (e.ctrlKey && (e.key === 'f' || e.key === 'ب')) {
        e.preventDefault();
        const el = document.querySelector('mat-form-field input');
        (el as HTMLInputElement)?.focus();
      }
    })
  }

  ngOnInit(): void {
    this.init();
  }

  init(withRefresh: boolean = true) {
    this.accounts.userDetails().subscribe({
      next: (res) => {
        if (location.pathname === '/login') {
          this.router.navigateByUrl('/');
        }

        this.loading.set(false);
        this.accounts.details.set(res);
      },
      error: ({ status, error: { detail } }: { status: number; error: { detail: string } }) => {
        this.loading.set(false);

        if (status === 401) {
          const refreshToken = localStorage.getItem('zidnahum-refresh-token');

          if (refreshToken === null || !withRefresh) {
            this.router.navigateByUrl('login');
            return
          }

          this.accounts.tokenRefresh({
            refresh: refreshToken,
          }).subscribe({
            next: (res) => {
              localStorage.setItem('zidnahum-token', res.access);
              localStorage.setItem('zidnahum-refresh-token', res.refresh);

              this.init(false);
            },
            error: () => {
              localStorage.removeItem('zidnahum-token');
              localStorage.removeItem('zidnahum-refresh-token');
              this.router.navigateByUrl('login');
            }
          })

        } else {
          this.snackbar.error(detail);
        }
      },
    })
  }
}
