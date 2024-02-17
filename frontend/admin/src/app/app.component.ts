import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutComponent } from './layout/layout.component';
import { AccountsService } from './services/api/accounts/accounts.service';
import { SnackbarService } from './services/snackbar.service';

// TODO: add error handler

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private accounts = inject(AccountsService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);

  public loading = this.accounts.loading;

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
          const refreshToken = localStorage.getItem('refresh-token');

          if (refreshToken === null || !withRefresh) {
            this.router.navigateByUrl('login');
            return
          }

          this.accounts.tokenRefresh({
            refresh: refreshToken,
          }).subscribe({
            next: (res) => {
              localStorage.setItem('token', res.access);
              localStorage.setItem('refresh-token', res.refresh);

              this.init(false);
            },
            error: () => {
              localStorage.removeItem('token');
              localStorage.removeItem('refresh-token');
              this.router.navigateByUrl('login');
            }
          })

        } else {
          this.snackbar.open(detail);
        }
      },
    })
  }
}
