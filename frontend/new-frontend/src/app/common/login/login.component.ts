import { Component, DestroyRef, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { AuthService, SnackbarService, LOADING, LayoutService } from '@shared';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatButton,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private auth = inject(AuthService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  protected loading = inject(LOADING);
  protected layout = inject(LayoutService);

  protected form = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);

    this.auth
      .login(this.form.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: () => this.loading.set(false),
        next: () => {
          this.loading.set(false);
          this.snackbar.success('تم تسجيل الدخول بنجاح');
          const user = this.auth.currentUser();
          if (user?.isAdmin) {
            return this.router.navigateByUrl('/admin');
          }
          return this.router.navigateByUrl('/');
        },
      });
  }
}
