import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AccountsService } from '../../services/api/accounts/accounts.service';
import { Router } from '@angular/router';
import { TranslateService } from '../../services/translate.service';
import { SnackbarService } from '../../services/snackbar.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private accounts = inject(AccountsService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  public loading = inject(LoadingService).loading;

  public form = this.fb.group({
    username: this.fb.nonNullable.control(''),
    password: this.fb.nonNullable.control(''),
  });

  submit() {
    if (this.form.invalid || this.loading()) return;

    const { username, password } = this.form.value;

    if (!username || !password) return;

    this.loading.set(true);
    this.accounts
      .tokenObtainPair({
        username,
        password,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.access);
          localStorage.setItem('refresh-token', res.refresh);

          this.accounts
            .userDetails()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: (res) => {
                this.accounts.details.set(res);

                this.snackbar.success('تم تسجيل الدخول بنجاح');

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
                  this.snackbar.error(this.translateService.translate(detail));
                }
                this.loading.set(false);
              },
            });
        },
        error: ({ error: { detail } }) => {
          this.snackbar.error(this.translateService.translate(detail));
          this.loading.set(false);
        },
      });
  }
}
