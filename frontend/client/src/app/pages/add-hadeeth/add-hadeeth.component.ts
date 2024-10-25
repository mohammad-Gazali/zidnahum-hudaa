import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormGroupDirective, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { LayoutService, MobileUtilsService, SnackbarService, StudentList, StudentsService } from '@shared';
import { catchError, distinctUntilChanged, EMPTY, filter, map, merge, Observable, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-add-hadeeth',
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
    MatCard,
    MatCardContent,
    MatRadioGroup,
    MatRadioButton,
  ],
  templateUrl: './add-hadeeth.component.html',
  styleUrl: './add-hadeeth.component.scss'
})
export class AddHadeethComponent {
  private fb = inject(NonNullableFormBuilder);
  private route = inject(ActivatedRoute);
  private studentsService = inject(StudentsService);
  private destroyRef = inject(DestroyRef);
  private loading = inject(LayoutService).loading;
  private snackbar = inject(SnackbarService);
  private mobileUtils = inject(MobileUtilsService);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.loading.set(false);
    });

    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        const control = this.form.controls.hadeethNumber;

        if (value === 'allah-names') {
          control.removeValidators(Validators.required);
        } else {
          control.addValidators(Validators.required);
        }

        control.updateValueAndValidity();
      });
  }

  protected search = this.fb.control('');
  protected selectedStudent = signal<StudentList | null>(null);
  protected search$ = new Subject<string>();
  protected form = this.fb.group({
    type: this.fb.control<'alarbaein-alnawawia' | 'riad-alsaalihin' | 'allah-names'>('alarbaein-alnawawia'),
    hadeethNumber: this.fb.control<number | undefined>(undefined, [Validators.required]),
  });

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
        this.mobileUtils.hideMobileKeyboard();
        this.search.setValue('');

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

  submitSearch() {
    this.search$.next(this.search.value);
  }

  submitAddHadeeth(ngForm: FormGroupDirective) {
    if (this.form.invalid) return;
    if (this.loading()) return;

    const student = this.selectedStudent();

    if (!student) return;

    const value = this.form.getRawValue();
    const type = value.type;

    const observable: Observable<any> = type === 'alarbaein-alnawawia'
      ? this.studentsService.studentsUpdateAlarbaeinAlnawawiaUpdate({
        id: student.id.toString(),
        data: {
          value: value.hadeethNumber!,
        }
      })
      : type === 'riad-alsaalihin'
        ? this.studentsService.studentsUpdateRiadAlsaalihinUpdate({
          id: student.id.toString(),
          data: {
            value: value.hadeethNumber!,
          }
        })
        : this.studentsService.studentsUpdateAllahNamesUpdate(student.id.toString());

    this.loading.set(true);

    observable
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: ({ error }) => {
          ngForm.resetForm();
          this.loading.set(false);
          this.snackbar.error((error && error.detail) ?? error);
        },
        next: () => {
          ngForm.resetForm();
          this.loading.set(false);
          this.snackbar.success(type === 'allah-names' ? 'تم تسجيل أسماء الله الحسنى بنجاح' : 'تم تسجيل الأحاديث بنجاح');
        }
      })
  }
}
