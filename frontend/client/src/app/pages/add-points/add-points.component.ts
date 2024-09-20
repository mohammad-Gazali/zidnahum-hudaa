import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormGroupDirective, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  LayoutService,
  MasjedPipe,
  MasjedService,
  PointsAddingCause,
  PointsService,
  SnackbarService,
  StudentList,
  StudentsService
} from '@shared';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatChip, MatChipRemove, MatChipSet } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { filter, map, shareReplay, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-points',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatLabel,
    MatError,
    MatIcon,
    MatInput,
    MatSuffix,
    MasjedPipe,
    MatOption,
    MatSelect,
    MatCard,
    MatCardContent,
    MatChip,
    MatChipRemove,
    MatChipSet,
    MatDivider,
  ],
  templateUrl: './add-points.component.html',
  styleUrl: './add-points.component.scss'
})
export class AddPointsComponent {
  private fb = inject(NonNullableFormBuilder);
  private students = inject(StudentsService);
  private destroyRef = inject(DestroyRef);
  private masjed = inject(MasjedService);
  private points = inject(PointsService);
  private snackbar = inject(SnackbarService);
  private loading = inject(LayoutService).loading;

  protected studentsResponse = signal<StudentList[]>([]);
  protected selectedStudents = signal<StudentList[]>([]);
  protected searched = signal(false);
  protected masjedOptions = this.masjed.masjedOptions;
  protected searchForm = this.fb.group({
    search: this.fb.control(''),
    masjed: this.fb.control<1 | 2 | 3>(1),
  });

  protected addingCauses = toSignal<PointsAddingCause[]>(this.points.pointsAddingCauseList(), {
    initialValue: [] as any,
  })

  protected pointsForm = this.fb.group({
    value: this.fb.control<number | undefined>(undefined, [Validators.required]),
    cause: this.fb.control<number | undefined>(undefined, [Validators.required]),
  });

  submitSearch() {
    if (this.searchForm.invalid) return;
    if (!this.searchForm.value.search) return;

    this.loading.set(true);

    this.students.studentsList({
      query: this.searchForm.getRawValue().search,
      masjed: this.searchForm.getRawValue().masjed,
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      error: () => {
        this.loading.set(false);
      },
      next: (res) => {
        this.loading.set(false);
        this.searched.set(true);
        this.studentsResponse.set(res.results);
      }
    })
  }

  selectStudent(student: StudentList) {
    this.selectedStudents.update(pre => {
      if (pre.find(s => s.id === student.id)) return pre;

      return [...pre, student];
    });
    this.studentsResponse.set([]);
    this.searched.set(false);
  }

  removeStudent(student: StudentList) {
    this.selectedStudents.update(pre => pre.filter(s => s.id !== student.id));
  }

  submitPoints(ngForm: FormGroupDirective) {
    if (this.pointsForm.invalid) return;
    if (this.loading()) return;

    const value = this.pointsForm.getRawValue();

    // validate maximum limit
    const cause = this.addingCauses()?.find(c => c.id === value.cause)

    if (cause && value.value && cause.maximum_limit < value.value) {
      this.snackbar.error(`الحد الأقصى لعدد النقاط المسموح إضافته لـ: ${cause.name} هو ${cause.maximum_limit}`);
      return;
    }

    this.loading.set(true);

    this.points.pointsAddingCreate({
      students: this.selectedStudents().map(s => s.id),
      cause: value.cause!,
      value: value.value!,
    }).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      error: ({ error }) => {
        ngForm.resetForm();
        this.loading.set(false);
        this.snackbar.error((error && error.detail) ?? error);
      },
      next: () => {
        ngForm.resetForm();
        this.loading.set(false);
        this.selectedStudents.set([]);
        this.searched.set(false);
        this.snackbar.success('تمت الإضافة بنجاح')
      }
    })
  }
}
