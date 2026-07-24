import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsService } from '@shared';
import { TranslatePipe } from '@shared';
import { SnackbarService } from '@shared';
import { LOADING } from '@shared';

@Component({
  selector: 'app-user-update-password',
  imports: [
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './user-update-password.component.html',
  styleUrl: './user-update-password.component.scss',
})
export class UserUpdatePasswordComponent {
  private actions = inject(ActionsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);
  private destroyRef = inject(DestroyRef);
  private fb = inject(NonNullableFormBuilder);
  public loading = inject(LOADING);

  public form = this.fb.group({
    new_password: this.fb.control(''),
  });

  submit() {
    if (this.form.invalid || !this.form.value.new_password || this.loading())
      return;

    this.loading.set(true);
    this.actions
      .actionsUserPasswordUpdate({
        user: this.route.snapshot.params['id'],
        new_password: this.form.value.new_password,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loading.set(false);
        this.router.navigateByUrl('/auth/user');
        this.snackbar.success('تم التعديل بنجاح');
      });
  }
}
