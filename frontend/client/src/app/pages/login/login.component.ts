import { Component, DestroyRef, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AuthService, LayoutService, SnackbarService } from '@shared';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatButton,
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
  protected loading = inject(LayoutService).loading;

  protected form = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);

    this.auth
      .login(this.form.getRawValue())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        error: () => this.loading.set(false),
        next: () => {
          this.loading.set(false);
          this.snackbar.success('تم تسجيل الدخول بنجاح');
          return this.router.navigateByUrl('/');
        }
      });
  }
}
