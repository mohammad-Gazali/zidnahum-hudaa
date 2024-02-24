import { Component, OnDestroy, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActionsService } from '../../../../../services/api/admin/services';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { MatIconModule } from '@angular/material/icon';
import { LoadingService } from '../../../../../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from '../../../../../services/snackbar.service';

@Component({
  selector: 'app-user-update-password',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, TranslatePipe],
  templateUrl: './user-update-password.component.html',
  styleUrl: './user-update-password.component.scss'
})
export class UserUpdatePasswordComponent implements OnDestroy {
  private actions = inject(ActionsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);
  public loading = inject(LoadingService).loading;

  public new_password = "";
  private destroyed$ = new Subject<void>();

  submit(form: NgForm) {
    if (form.invalid || this.loading()) return;

    this.loading.set(true);
    this.actions.actionsUserPasswordUpdate({
      user: this.route.snapshot.params['id'],
      new_password: this.new_password,
    }).pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.loading.set(false);
      this.router.navigateByUrl('/auth/user');
      this.snackbar.open('تم التعديل بنجاح');
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
