import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AccountsService } from '../../services/api/accounts/accounts.service';
import { Router } from '@angular/router';
import { TranslateService } from '../../services/translate.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  private accounts = inject(AccountsService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  private translateService = inject(TranslateService);
  public loading = inject(LoadingService).loading;

  username = '';
  password = '';
  destroyed$ = new Subject<void>();

  submit(form: NgForm) {
    if (form.invalid) return;

    this.loading.set(true);
    this.accounts
      .tokenObtainPair({
        username: this.username,
        password: this.password,
      })
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.access);
          localStorage.setItem('refresh-token', res.refresh);

          this.accounts
            .userDetails()
            .pipe(takeUntil(this.destroyed$))
            .subscribe({
              next: (res) => {
                this.accounts.details.set(res);

                this.snackbar.open('تم تسجيل الدخول بنجاح');

                this.router.navigateByUrl('/');

                this.loading.set(false);
              },
              error: ({
                status,
                error: { detail },
              }: {
                status: number;
                error: { detail: string };
              }) => {
                if (status === 401) {
                  if (location.pathname !== '/login') {
                    this.router.navigateByUrl('login');
                  }
                } else {
                  this.snackbar.open(this.translateService.translate(detail));
                }
                this.loading.set(false);
              },
            });
        },
        error: ({ error: { detail } }) => {
          this.snackbar.open(this.translateService.translate(detail));
          this.loading.set(false);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
