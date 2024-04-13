import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DialogData } from './view-delete-dialog.interface';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { SnackbarService } from '../../../services/snackbar.service';
import { EMPTY, catchError, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-delete-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './view-delete-dialog.component.html',
  styleUrl: './view-delete-dialog.component.scss',
})
export class ViewDeleteDialogComponent {
  public ref = inject(MatDialogRef);
  public data: DialogData = inject(MAT_DIALOG_DATA);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  public loading = signal(false);

  deleteFunc() {
    this.loading.set(true);
    this.ref.disableClose = true;
    this.data
      .deleteFunc()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
        catchError((err: HttpErrorResponse) => {
          if ('detail' in err.error) {
            this.snackbar.error(err.error.detail);
          }
          this.ref.close();
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.router.navigateByUrl(
          `/${this.data.groupName}/${this.data.itemNameAndRouteName}`
        );
        this.ref.close();

        // something went wrong here so I made the arabic
        // language dicetly
        this.snackbar.success('تم الحذف بنجاح');
      });
  }
}
