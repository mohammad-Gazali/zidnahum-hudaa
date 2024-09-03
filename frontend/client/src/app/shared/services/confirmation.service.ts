import { Component, inject, Injectable } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private dialog = inject(MatDialog);

  public confirm(param: ConfirmationParam) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: param
    })
  }
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  template: `
    <h2 mat-dialog-title>تأكيد</h2>
    <mat-dialog-content>
      {{ message }}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button (click)="reject()" mat-button>لا</button>
      <button (click)="accept()" class="error" mat-button>نعم</button>
    </mat-dialog-actions>
  `,
})
class ConfirmationDialogComponent {
  private data = inject<ConfirmationParam>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef);

  protected message = this.data.message;

  reject() {
    this.dialogRef.close();
  }

  accept() {
    this.data.onConfirm();
    this.dialogRef.close();
  }
}

interface ConfirmationParam {
  message: string;
  onConfirm: () => void;
}
