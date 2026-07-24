import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroupDirective, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatChip, MatChipRemove } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { StudentSearchComponent, SearchStudent } from '@admin/components';
import { QuranEliteTestService } from '@admin/services';
import { SnackbarService, ExtraService, LOADING } from '@shared';

@Component({
  selector: 'app-add-elite-test',
  imports: [
    MatCard,
    MatIcon,
    MatChip,
    MatChipRemove,
    MatButton,
    MatRipple,
    StudentSearchComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-elite-test.component.html',
  styleUrl: './add-elite-test.component.scss',
})
export class AddEliteTestComponent {
  private fb = inject(NonNullableFormBuilder);
  private snackbar = inject(SnackbarService);
  private matSnackbar = inject(MatSnackBar);
  private extra = inject(ExtraService);
  private destroyRef = inject(DestroyRef);
  private loading = inject(LOADING);
  private quranElite = inject(QuranEliteTestService);

  protected selectedStudent = signal<SearchStudent | null>(null);

  protected form = this.fb.group({
    parts: this.fb.array(
      Array(60)
        .fill(-1)
        .map(() => this.fb.control(false)),
    ),
  });

  submit(form: FormGroupDirective) {
    const value = this.form.getRawValue();
    const selectedStudent = this.selectedStudent();

    if (!selectedStudent) {
      this.snackbar.error('يجب اختيار طالب قبل الإضافة');
      return;
    }

    if (value.parts.every((v) => !v)) return;

    this.loading.set(true);

    this.extra
      .extraAddEliteTest({
        student: selectedStudent.id,
        parts: value.parts
          .map((value, index) => (value ? index : -1))
          .filter((item) => item !== -1),
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((res) => {
        this.selectedStudent.set(null);
        form.resetForm();

        if (res.repeated_parts.length !== 0) {
          this.matSnackbar.open(
            ' تم التسجيل بنجاح, ولكن يوجد تكرار بـ:' +
              res.repeated_parts.map((item: number) => this.quranElite.transform(item)).join(', '),
            'إغلاق',
          );
        } else {
          this.snackbar.success('تمت الإضافة بنجاح');
        }
      });
  }
}
