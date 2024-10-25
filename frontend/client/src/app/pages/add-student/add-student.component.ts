import { Component, DestroyRef, inject } from '@angular/core';
import {
  LayoutService,
  MasjedPipe,
  MasjedService,
  MobileUtilsService,
  SnackbarService,
  StudentCategory,
  StudentGroup,
  StudentsService
} from '@shared';
import { FormGroupDirective, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatSuffix,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    MatIcon,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MasjedPipe,
  ],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss',
  providers: [
    provideNativeDateAdapter(),
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ar',
    },
  ],
})
export class AddStudentComponent {
  private fb = inject(NonNullableFormBuilder);
  private students = inject(StudentsService);
  private destroyRef = inject(DestroyRef);
  private snackbar = inject(SnackbarService);
  private masjed = inject(MasjedService);
  private loading = inject(LayoutService).loading;
  private mobileUtils = inject(MobileUtilsService);

  protected masjedOptions = this.masjed.masjedOptions;
  protected categories = toSignal<StudentCategory[]>(this.students.studentsCategoryList(), {
    initialValue: [] as any,
  });
  protected groups = toSignal<StudentGroup[]>(this.students.studentsGroupList(), {
    initialValue: [] as any,
  });
  protected form = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    mother_name: this.fb.control('', [Validators.required]),
    birthdate: this.fb.control<Date | null>(null),
    masjed: this.fb.control<1 | 2 | 3>(undefined as any, [Validators.required]),
    address: this.fb.control(''),
    static_phone: this.fb.control(''),
    cell_phone: this.fb.control(''),
    father_phone: this.fb.control(''),
    mother_phone: this.fb.control(''),
    father_work: this.fb.control(''),
    notes: this.fb.control(''),
    bring_him: this.fb.control(''),
    parts_received: this.fb.control(''),
    category: this.fb.control<number | undefined>(undefined),
    group: this.fb.control<number | undefined>(undefined),
  });

  submit(ngForm: FormGroupDirective) {
    if (this.form.invalid) return;
    if (this.loading()) return;

    this.loading.set(true);

    const value = this.form.getRawValue();

    this.students
      .studentsCreate({
        ...value,
        birthdate: value.birthdate ? formatDate(value.birthdate, 'yyyy-MM-dd', 'en-Us') : null,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: ({ error }) => {
          this.loading.set(false);
          this.snackbar.error((error && error.detail) ?? error);
        },
        next: () => {
          this.loading.set(false);
          this.snackbar.success('تمت إضافة الطالب بنجاح');
          this.mobileUtils.hideMobileKeyboard();
          ngForm.resetForm();
        }
      });
  }
}
