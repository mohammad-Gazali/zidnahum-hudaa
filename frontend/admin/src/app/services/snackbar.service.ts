import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);
  
  public open(message: string) {
    this.snackbar.open(message, 'إغلاق', {
      duration: 5000,
    })
  }
}
