import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatCard } from '@angular/material/card';
import {
  MatRadioButton,
  MatRadioChange,
  MatRadioGroup,
} from '@angular/material/radio';
import { StudentSearchComponent } from '../../../../shared/student-search/student-search.component';
import { SearchStudent } from '../../../../shared/student-search/search-student.interface';
import {
  ExtraService,
  StudentsService,
} from '../../../../services/api/admin/services';
import {
  NonNullableFormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { MatError, MatInput, MatLabel } from '@angular/material/input';
import { MatChipRemove, MatChipRow } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { finalize } from 'rxjs';
import { MoneyBase } from '../money.base';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { MatButton } from '@angular/material/button';
import { MasjedService } from '../../../../services/masjed.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { LOADING } from '../../../../tokens/loading.token';

@Component({
  selector: 'app-add-money-deleting',
  standalone: true,
  templateUrl: './add-money-deleting.component.html',
  styleUrl: './add-money-deleting.component.scss',
  imports: [
    MatCard,
    MatSelect,
    MatOption,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatRadioGroup,
    MatRadioButton,
    MatButton,
    MatChipRow,
    MatChipRemove,
    MatIcon,
    StudentSearchComponent,
    ReactiveFormsModule,
    TranslatePipe,
  ],
})
export class AddMoneyDeletingComponent extends MoneyBase {
  private extra = inject(ExtraService);
  private students = inject(StudentsService);
  private fb = inject(NonNullableFormBuilder);
  private masjed = inject(MasjedService);
  private snackbar = inject(SnackbarService);
  private destroyRef = inject(DestroyRef);
  public loading = inject(LOADING);

  public selectedStudents = signal<Set<SearchStudent>>(new Set());
  public mode = signal<'normal' | 'category'>('normal');
  public causes = toSignal(this.money.moneyDeletingCauseList());
  public categories = toSignal(this.students.studentsCategoryList());
  public masjeds = toSignal(this.masjed.getMasjeds());

  public normalForm = this.fb.group({
    cause: this.fb.control<number | undefined>(undefined, [
      Validators.required,
    ]),
    value: this.fb.control<number | undefined>(undefined, [
      Validators.required,
    ]),
  });

  public categoryForm = this.fb.group({
    masjed: this.fb.control<1 | 2 | 3 | undefined>(undefined, [
      Validators.required,
    ]),
    category: this.fb.control<number | undefined>(undefined, [
      Validators.required,
    ]),
    cause: this.fb.control<number | undefined>(undefined, [
      Validators.required,
    ]),
    value: this.fb.control<number | undefined>(undefined, [
      Validators.required,
    ]),
  });

  removeStudent(student: SearchStudent) {
    this.selectedStudents.update(
      (pre) => new Set([...pre].filter((s) => s.id !== student.id))
    );
  }

  public radioChange(change: MatRadioChange) {
    this.mode.set(change.value);
  }

  public normalSubmit(form: FormGroupDirective) {
    if (!this.normalForm.valid || this.loading()) return;
    if (this.selectedStudents().size === 0) {
      this.snackbar.error('يجب اختيار الطلاب قبل الإضافة');
      return;
    }

    this.loading.set(true);

    this.extra
      .extraAddMoneyDeletingNormalCreate({
        students: [...this.selectedStudents()].map((s) => s.id),
        value: this.normalForm.value.value ?? 0,
        cause: this.normalForm.value.cause ?? -1,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe(() => {
        this.selectedStudents.set(new Set());
        this.snackbar.success('تمت الإضافة بنجاح');
        form.resetForm();
      });
  }

  public categorySubmit(form: FormGroupDirective) {
    if (!this.categoryForm.valid || this.loading()) return;

    this.loading.set(true);

    this.extra
      .extraAddMoneyDeletingCategoryCreate({
        masjed: this.categoryForm.value.masjed ?? 1,
        category: this.categoryForm.value.category ?? -1,
        value: this.categoryForm.value.value ?? 0,
        cause: this.categoryForm.value.cause ?? -1,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe(() => {
        this.selectedStudents.set(new Set());
        this.snackbar.success('تمت الإضافة بنجاح');
        form.resetForm();
      });
  }
}
