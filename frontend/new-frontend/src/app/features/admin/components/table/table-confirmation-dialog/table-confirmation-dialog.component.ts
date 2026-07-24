import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@shared';
import { TableConfirmationDialogData } from './table-confirmation-dialog.interface';

@Component({
  selector: 'app-table-confirmation-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    TranslatePipe,
  ],
  templateUrl: './table-confirmation-dialog.component.html',
  styleUrl: './table-confirmation-dialog.component.scss',
})
export class TableConfirmationDialogComponent {
  public data: TableConfirmationDialogData = inject(MAT_DIALOG_DATA);
}
