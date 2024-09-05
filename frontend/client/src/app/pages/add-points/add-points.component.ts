import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  LayoutService,
  MasjedPipe,
  MasjedService,
  PointsAddingCause, PointsDeletingCause,
  PointsService, SnackbarService,
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
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatDivider } from '@angular/material/divider';

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
    MatRadioGroup,
    MatRadioButton,
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
  protected pointsForm = this.fb.group({
    type: this.fb.control<'add' | 'remove'>('add'),
    value: this.fb.control<number | undefined>(undefined, [Validators.required]),
    cause: this.fb.control<number | undefined>(undefined, [Validators.required]),
  });
  protected addingCauses = toSignal<PointsAddingCause[]>(this.points.pointsAddingCauseList(), {
    initialValue: [] as any,
  })
  protected deletingCauses = toSignal<PointsDeletingCause[]>(this.points.pointsDeletingCauseList(), {
    initialValue: [] as any,
  })

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

  submitPoints() {
    if (this.pointsForm.invalid) return;
    if (this.loading()) return;

    const value = this.pointsForm.getRawValue();

    const observable = value.type === 'add' ?
      this.points.pointsAddingCreate({
        students: this.selectedStudents().map(s => s.id),
        cause: value.cause!,
        value: value.value!,
      }) :
      this.points.pointsDeletingCreate({
        students: this.selectedStudents().map(s => s.id),
        cause: value.cause!,
        value: value.value!,
      })

    this.loading.set(true);

    observable.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      error: ({ error }) => {
        this.loading.set(false);
        this.snackbar.error((error && error.detail) ?? error);
      },
      next: () => {
        this.loading.set(false);
        this.selectedStudents.set([]);
        this.searched.set(false);
        this.snackbar.success(value.type === 'add' ? 'تمت الإضافة بنجاح' : 'تم الخصم بنجاح')
      }
    })
  }
}
