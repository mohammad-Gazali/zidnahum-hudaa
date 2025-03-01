import { Component, DestroyRef, inject, signal } from '@angular/core';
import { StudentSearchComponent } from '../../../../shared/student-search/student-search.component';
import { MatCard } from '@angular/material/card';
import { MatChip, MatChipRemove } from '@angular/material/chips';
import { SearchStudent } from '../../../../shared/student-search/search-student.interface';
import { MatIcon } from '@angular/material/icon';
import {
  FormGroupDirective,
  NgForm,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { QuranEliteTestService } from '../../../../services/quran/quran-elite-test.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { ExtraService } from '../../../../services/api/admin/services';
import { LOADING } from '../../../../tokens/loading.token';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-elite-test',
  standalone: true,
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
        .map(() => this.fb.control(false))
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
        parts:
          value.parts
            .map((value, index) => (value ? index : -1))
            .filter((item) => item !== -1),
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe(res => {
        this.selectedStudent.set(null);
        form.resetForm();

        if (res.repeated_parts.length !== 0) {
          this.matSnackbar.open(' تم التسجيل بنجاح, ولكن يوجد تكرار بـ:' + res.repeated_parts.map((item: number) => this.quranElite.transform(item)).join(', '), 'إغلاق');
        } else {
          this.snackbar.success('تمت الإضافة بنجاح');
        }
      });
  }
}
