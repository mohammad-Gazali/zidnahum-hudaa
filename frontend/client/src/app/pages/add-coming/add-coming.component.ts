import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {
  ComingCategory,
  ComingsService,
  LayoutService,
  MasjedPipe,
  MasjedService,
  SnackbarService,
  StudentsService
} from '@shared';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { AddComingStudentListService } from './add-coming-student-list.service';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-add-coming',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatButton,
    MatIcon,
    MatSelect,
    MatOption,
    DatePipe,
    MasjedPipe,
    MatCard,
    MatDivider,
  ],
  templateUrl: './add-coming.component.html',
  styleUrl: './add-coming.component.scss'
})
export class AddComingComponent {
  private students = inject(StudentsService);
  private comings = inject(ComingsService);
  private destroyRef = inject(DestroyRef);
  private list = inject(AddComingStudentListService);
  private snackbar = inject(SnackbarService);
  private masjed = inject(MasjedService);
  public loading = inject(LayoutService).loading;

  constructor() {
    this.destroyRef.onDestroy(() => this.loading.set(false))
  }

  public response = this.list.lastResponse;
  public searchForm = this.list.searchForm;
  public submitted = computed(() => this.response() !== undefined);
  public loadingIds = signal<number[]>([]);
  public masjedOptions = this.masjed.masjedOptions;
  public categories = toSignal(
    this.comings.comingsCategoryList().pipe(
      tap((res) => {
        this.searchForm.controls.categoryId.setValue(res[0].id);
      })
    ),
    { initialValue: [] as ComingCategory[] }
  );

  submit() {
    if (!this.searchForm.value.search) return;

    this.getStudents();
  }

  getStudents(url?: string) {
    const params = new URLSearchParams(url?.split('?')[1]);

    const query = params.get('query') ?? this.searchForm.value.search;
    const masjed: any = params.get('masjed') ?? this.searchForm.value.masjed;
    const page = Number(params.get('page')) || 1;
    const comingCategoryId = url?.split('?')[0].split('/').at(-1) ?? String(this.searchForm.value.categoryId);

    this.loading.set(true);

    this.students
      .studentsWithComingRegistrationList({
        comingCategoryId,
        query,
        page,
        masjed,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        error: () => {
          this.loading.set(false);
        },
        next: (res) => {
          this.loading.set(false);
          this.response.set(res);
        },
      });
  }

  addComing(studentId: number) {
    if (this.loadingIds().indexOf(studentId) !== -1) return;

    this.loadingIds.update(pre => [...pre, studentId]);

    this.comings.comingsCreate({
      student: studentId,
      category: this.searchForm.value.categoryId!,
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      error: (err) => {
        this.loadingIds.update(pre => pre.filter(id => id !== studentId));
        this.snackbar.error((err && err.detail) ?? err);
      },
      next: () => {
        this.loadingIds.update(pre => pre.filter(id => id !== studentId));
        this.snackbar.success('تم تسجيل الحضور بنجاح');
        this.response.update(pre => pre ? ({
          ...pre,
          results: pre.results.map(s => s.id !== studentId ? s : ({
            ...s,
            is_registered_today: true,
          }))
        }) : pre);
      }
    });
  }
}
