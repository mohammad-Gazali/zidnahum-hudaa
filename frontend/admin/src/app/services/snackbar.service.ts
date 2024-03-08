import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);
  
  public success(message: string) {
    this.snackbar.open(message, 'إغلاق', {
      duration: 5000,
      panelClass: 'snackbar-success',
    })
  }

  public error(message: string) {
    this.snackbar.open(message, 'إغلاق', {
      duration: 5000,
      panelClass: 'snackbar-error',
    })
  }

  public open(message: string) {
    this.snackbar.open(message, 'إغلاق', {
      duration: 5000,
    })
  }
}
