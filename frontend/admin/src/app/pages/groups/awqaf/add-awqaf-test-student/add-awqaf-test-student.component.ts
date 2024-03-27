import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatChipRow, MatChipRemove } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import {
  MatRadioGroup,
  MatRadioButton,
  MatRadioChange,
} from '@angular/material/radio';
import { MatSelect, MatOption } from '@angular/material/select';
import {
  MatFormField,
  MatLabel,
  MatError,
  MatHint,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { StudentSearchComponent } from '../../../../shared/student-search/student-search.component';
import { SearchStudent } from '../../../../shared/student-search/search-student.interface';
import {
  AwqafService,
  ExtraService,
} from '../../../../services/api/admin/services';
import { SnackbarService } from '../../../../services/snackbar.service';
import { AwqafTestNoQList } from '../../../../services/api/admin/models';
import { MatRipple } from '@angular/material/core';
import { QuranAwqafTestService } from '../../../../services/quran/quran-awqaf-test.service';

@Component({
  selector: 'app-add-awqaf-test-student',
  standalone: true,
  imports: [
    MatCard,
    MatChipRow,
    MatChipRemove,
    MatIcon,
    MatRadioGroup,
    MatRadioButton,
    MatSelect,
    MatOption,
    MatFormField,
    MatLabel,
    MatError,
    MatHint,
    MatInput,
    MatButton,
    MatRipple,
    ReactiveFormsModule,
    StudentSearchComponent,
    TranslatePipe,
  ],
  templateUrl: './add-awqaf-test-student.component.html',
  styleUrl: './add-awqaf-test-student.component.scss',
})
export class AddAwqafTestStudentComponent {
  private awqaf = inject(AwqafService);
  private fb = inject(FormBuilder);
  private extra = inject(ExtraService);
  private snackbar = inject(SnackbarService);
  public transform = inject(QuranAwqafTestService).transform;

  public selectedStudents = signal<Set<SearchStudent>>(new Set());
  public mode = signal<'quran' | 'non-quran'>('quran');
  public awqafNoQTests = signal<AwqafTestNoQList[]>([]);

  public quranForm = this.fb.group({
    type: this.fb.nonNullable.control<'normal' | 'looking' | 'explaining'>(
      'normal',
      [Validators.required]
    ),
    parts: this.fb.array(
      Array(30)
        .fill(-1)
        .map(() => {
          return this.fb.nonNullable.control<boolean>(false);
        })
    ),
  });

  public nonQuranForm = this.fb.group({
    value: this.fb.nonNullable.control(undefined, [Validators.required]),
  });

  constructor() {
    this.awqaf
      .awqafTestNoQList()
      .pipe(takeUntilDestroyed())
      .subscribe((res) => this.awqafNoQTests.set(res));
  }

  removeStudent(student: SearchStudent) {
    this.selectedStudents.update(
      (pre) => new Set([...pre].filter((s) => s.id !== student.id))
    );
  }

  radioChange(change: MatRadioChange) {
    this.mode.set(change.value);
  }

  submitNoQ(form: FormGroupDirective) {
    if (!this.nonQuranForm.valid) return;
    if (this.selectedStudents().size === 0) {
      this.snackbar.error('يجب اختيار الطلاب قبل الإضافة')
      return;
    }

    this.extra
      .extraAddAwqafNoQTestCreate({
        students: [...this.selectedStudents()].map((s) => s.id),
        test: this.nonQuranForm.value.value ?? -1,
      })
      .subscribe(() => {
        this.selectedStudents.set(new Set());
        this.snackbar.success('تمت الإضافة بنجاح');
        form.resetForm();
      });
  }

  submitQ(form: FormGroupDirective) {
    if (!this.quranForm.valid) return;
    if (this.selectedStudents().size === 0) {
      this.snackbar.error('يجب اختيار الطلاب قبل الإضافة')
      return;
    }

    this.extra.extraAddAwqafQTestCreate({
      type: this.quranForm.value.type ?? 'normal',
      students: [...this.selectedStudents()].map((s) => s.id),
      parts:
        this.quranForm.value.parts
          ?.map((value, index) => (value ? index : -1))
          .filter((item) => item !== -1) ?? [],
    })
    .subscribe(() => {
      this.selectedStudents.set(new Set());
      this.snackbar.success('تمت الإضافة بنجاح');
      form.resetForm();
    });
  }
}
