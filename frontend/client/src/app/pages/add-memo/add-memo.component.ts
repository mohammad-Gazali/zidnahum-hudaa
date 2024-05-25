import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { LayoutService, StudentList, StudentsService } from '@shared';
import { catchError, distinctUntilChanged, EMPTY, filter, map, merge, Subject, switchMap, tap } from 'rxjs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MemoFormComponent, MemoSubmit } from './memo-form/memo-form.component';
import { TestFormComponent, TestSubmit } from './test-form/test-form.component';

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

  }

  onTestSubmit(value: TestSubmit) {

  }
}
