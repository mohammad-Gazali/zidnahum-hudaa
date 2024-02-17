import { Component, OnDestroy, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { MatButtonModule } from '@angular/material/button';
import { DialogData } from './view-delete-dialog.interface';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from '../../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-delete-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, TranslatePipe],
  templateUrl: './view-delete-dialog.component.html',
  styleUrl: './view-delete-dialog.component.scss'
})
export class ViewDeleteDialogComponent implements OnDestroy {
  public ref = inject(MatDialogRef);
  public data: DialogData = inject(MAT_DIALOG_DATA);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  
  public loading = signal(false);
  private destroyed$ = new Subject<void>();

  deleteFunc() {
    this.loading.set(true);
    this.ref.disableClose = true;
    this.data.deleteFunc().pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.loading.set(false);
      this.router.navigateByUrl(`/${this.data.groupName}/${this.data.itemNameAndRouteName}`)
      this.ref.close();

      // something went wrong here so I made the arabic
      // language dicetly
      this.snackbar.open('تم الحذف بنجاح');
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
