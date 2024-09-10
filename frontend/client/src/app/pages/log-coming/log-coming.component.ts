import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  ComingCategory,
  ComingList,
  ComingsService,
  ConfirmationService,
  LayoutService,
  SnackbarService,
} from '@shared';
import { BehaviorSubject, combineLatest, map, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-log-coming',
  standalone: true,
  imports: [
    DatePipe,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatChip,
    MatIcon,
    MatMiniFabButton,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInput,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideNativeDateAdapter(),
  ],
  templateUrl: './log-coming.component.html',
  styleUrl: './log-coming.component.scss'
})
export class LogComingComponent {
  private comings = inject(ComingsService);
  private confirmation = inject(ConfirmationService);
  private destroyRef = inject(DestroyRef);
  private snackbar = inject(SnackbarService);
  private fb = inject(NonNullableFormBuilder);
  protected loading = inject(LayoutService).loading;

  protected searchForm = this.fb.group({
    studentName: this.fb.control(''),
    startDate: this.fb.control<Date | undefined>(undefined),
    endDate: this.fb.control<Date | undefined>(undefined),
    category: this.fb.control<number | undefined>(undefined),
  });

  private page$ = new BehaviorSubject(1);
  private search$ = new BehaviorSubject<SearchFormValue>({});
  private messages$ = combineLatest([
    this.search$,
    this.page$,
  ]).pipe(
    tap(() => this.loading.set(true)),
    switchMap(([searchValue, page]) => {
      return this.comings.comingsList(page);
    }),
    tap(res => {
      this.hasPrevious.set(Boolean(res.previous));
      this.hasNext.set(Boolean(res.next));
      this.loading.set(false);
    }),
    map(res => res.results),
  );
  private categories$ = this.comings.comingsCategoryList();

  protected hasNext = signal(false);
  protected hasPrevious = signal(false);
  protected loadingIds = signal<number[]>([]);
  protected messages = toSignal<ComingList[]>(this.messages$, {
    initialValue: [] as any,
  });
  protected categories = toSignal<ComingCategory[]>(this.categories$, { initialValue: [] as any });
  protected categoriesMap = toSignal<Map<number, string>>(
    this.categories$.pipe(
        map(res => new Map(
          res.map(category => [category.id, category.name]),
        )),
      ),
  )

  nextPage() {
    if (!this.hasNext()) return;
    this.page$.next(this.page$.value + 1);
  }

  previousPage() {
    if (!this.hasPrevious()) return;
    this.page$.next(this.page$.value - 1);
  }

  delete(studentId: number) {
    this.confirmation.confirm({
      message: 'هل أنت متأكد من حذف الحضور للطالب ؟',
      onConfirm: () => {
        this.loadingIds.update(pre => [...pre, studentId]);
        this.comings.comingsDelete(studentId).pipe(
          takeUntilDestroyed(this.destroyRef),
        ).subscribe({
          error: ({ error }) => {
            this.loadingIds.update(pre => pre.filter(id => id !== studentId));
            this.snackbar.error((error && error.detail) ?? error);
          },
          next: () => {
            this.loadingIds.update(pre => pre.filter(id => id !== studentId));
            this.snackbar.success('تم حذف الحضور بنجاح');
            this.search$.next(this.search$.value);
          },
        });
      },
    });
  }

  search() {
    const value = this.searchForm.value;
    if (!value.endDate && !value.startDate && !value.studentName && !value.category) return;
  }
}

interface SearchFormValue {
  studentName?: string;
  startDate?: Date;
  endDate?: Date;
  category?: number;
}
