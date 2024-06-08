import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { LayoutService, SnackbarService, StudentList, StudentsService } from '@shared';
import { catchError, distinctUntilChanged, EMPTY, filter, map, merge, Subject, switchMap, tap } from 'rxjs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MemoFormComponent, MemoSubmit } from './memo-form/memo-form.component';
import { TestFormComponent, TestSubmit } from './test-form/test-form.component';
import { MemoService } from '../../shared/services/memo.service';

@Component({
  selector: 'app-add-memo',
  standalone: true,
  imports: [
    MatFormField,
    MatSuffix,
    MatInput,
    MatIcon,
    MatButton,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatTabGroup,
    MatTab,
    MemoFormComponent,
    TestFormComponent,
  ],
  templateUrl: './add-memo.component.html',
  styleUrl: './add-memo.component.scss'
})
export class AddMemoComponent {
  private fb = inject(NonNullableFormBuilder);
  private route = inject(ActivatedRoute);
  private studentsService = inject(StudentsService);
  private destroyRef = inject(DestroyRef);
  private loading = inject(LayoutService).loading;
  private snackbar = inject(SnackbarService);
  private memo = inject(MemoService);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.loading.set(false);
    });
  }

  protected search = this.fb.control<string>('');
  protected selectedStudent = signal<StudentList | null>(null);
  protected search$ = new Subject<string>();

  protected students = toSignal(
    merge(
      this.route.queryParams,
      this.search$,
    ).pipe(
      map(val => typeof val === 'string' ? val : val['id'] as string),
      filter(Boolean),
      distinctUntilChanged(),
      tap(() => this.loading.set(true)),
      switchMap(value =>
        this.studentsService.studentsList({
          query: value
        })
      ),
      map(res => res.results),
      tap(students => {
        this.loading.set(false);
        this.selectedStudent.set(null);

        if (students.length === 1) {
          this.selectedStudent.set(students[0]);
        }
      }),
      catchError(() => {
        this.loading.set(false);
        return EMPTY;
      })
    ));
  protected searched = toSignal(
    this.search$.pipe(
      map(Boolean),
    ),
    {
      initialValue: false,
    }
  );

  submit() {
    this.search$.next(this.search.value);
  }

  onMemoSubmit(value: MemoSubmit) {
    if (this.loading()) return;

    const selectedStudent = this.selectedStudent();

    if (!selectedStudent) return;

    const q_memo = [...value.exact];

    value.single && q_memo.push(value.single);

    if (value.from && value.to) {
      for (let item = value.from; item <= value.to; item++) {
        q_memo.push(item);
      }
    }

    this.loading.set(true);

    this.studentsService.studentsUpdateQmemoUpdate({
      id: selectedStudent.id.toString(),
      data: {
        q_memo: q_memo.map(n => n - 1),
      },
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
          if (res.repeated_memo.length !== 0) {
            this.snackbar.open(' تم التسجيل التسميع بنجاح, ولكن يوجد تكرار بـ:' + res.repeated_memo.map((item: number) => this.memo.transform(item)).join(', '))
          } else {
            this.snackbar.success('تم تسجيل التسميع بنجاح');
          }
        }
      });
  }

  onTestSubmit(value: TestSubmit) {
    const selectedStudent = this.selectedStudent();

    if (!selectedStudent) return;

    // TODO: continue from here
    const q_test = value.type === 'quarter' ?
      [value.part] :
      value.type === 'half' ?
        [] : []

    this.loading.set(true);

    this.studentsService.studentsUpdateQtestUpdate({
      id: selectedStudent.id.toString(),
      data: {
        q_test: q_test.map(n => n - 1),
      },
    })
  }
}
