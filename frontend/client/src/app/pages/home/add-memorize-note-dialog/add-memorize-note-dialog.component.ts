import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { SnackbarService, StudentsService } from '@shared';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-add-memorize-note-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatProgressBar,
  ],
  templateUrl: './add-memorize-note-dialog.component.html',
  styleUrl: './add-memorize-note-dialog.component.scss'
})
export class AddMemorizeNoteDialogComponent {
  private students = inject(StudentsService);
  private studentId = inject<number>(MAT_DIALOG_DATA);
  private fb = inject(NonNullableFormBuilder);
  private snackbar = inject(SnackbarService);
  private destroyRef = inject(DestroyRef);
  private dialogRef = inject(MatDialogRef);

  protected loading = signal(false);
  protected form = this.fb.group({
    note: this.fb.control('', [Validators.required]),
  })

  protected submit() {
    if (this.form.invalid || this.loading()) return;

    this.dialogRef.disableClose = true;
    this.loading.set(true);

    this.students.studentsMemorizeNotesCreate({
      student: this.studentId,
      content: this.form.getRawValue().note
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: (err) => {
          this.loading.set(false);
          this.snackbar.error((err && err.detail) ?? err);
        },
        next: () => {
          this.loading.set(false);
          this.snackbar.success('تمت إضافة الملاحظة بنجاح');
          this.dialogRef.close();
        },
      })
  }
}
