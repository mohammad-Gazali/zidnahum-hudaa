import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  ComingCategory,
  ComingList,
  ComingsService,
  ConfirmationService,
  LayoutService,
  MasjedPipe,
  MasjedService,
  SnackbarService,
} from '@shared';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, formatDate } from '@angular/common';
import { MatButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
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
    MasjedPipe,
    MatIconButton,
  ],
  providers: [
    provideNativeDateAdapter(),
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ar',
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        subscriptSizing: 'dynamic'
      },
    }
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
  private masjed = inject(MasjedService);
  protected loading = inject(LayoutService).loading;

  protected masjedOptions = this.masjed.masjedOptions;
  protected searchForm = this.fb.group({
    studentName: this.fb.control(undefined),
    startDate: this.fb.control<Date | undefined>(undefined),
    endDate: this.fb.control<Date | undefined>(undefined),
    category: this.fb.control<number | undefined>(undefined),
    masjed: this.fb.control<1 | 2 | 3 | undefined>(undefined),
  });

  private page$ = new BehaviorSubject(1);
  private search$ = new BehaviorSubject<SearchFormValue>({
    studentName: undefined,
    startDate: undefined,
    endDate: undefined,
    category: undefined,
    masjed: undefined,
  });
  private messages$ = combineLatest([
    this.search$.pipe(
      distinctUntilChanged((pre, curr) => JSON.stringify(pre) === JSON.stringify(curr)),
    ),
    this.page$,
  ]).pipe(
    tap(() => this.loading.set(true)),
    switchMap(([searchValue, page]) => {
      return this.comings.comingsList({
        page,
        registeredAtGt: searchValue.startDate ? formatDate(searchValue.startDate, 'yyyy-MM-dd', 'en-Us') : undefined,
        registeredAtLt: searchValue.endDate ? formatDate(searchValue.endDate, 'yyyy-MM-dd', 'en-Us') : undefined,
        category: searchValue.category?.toString(),
        studentMasjed: searchValue.masjed?.toString() as any,
        studentName: searchValue.studentName,
      });
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
  );

  nextPage() {
    if (!this.hasNext()) return;
    this.page$.next(this.page$.value + 1);
  }

  previousPage() {
    if (!this.hasPrevious()) return;
    this.page$.next(this.page$.value - 1);
  }

  delete(id: number) {
    this.confirmation.confirm({
      message: 'هل أنت متأكد من حذف الحضور للطالب ؟',
      onConfirm: () => {
        this.loadingIds.update(pre => [...pre, id]);
        this.comings.comingsDelete(id).pipe(
          takeUntilDestroyed(this.destroyRef),
        ).subscribe({
          error: ({ error }) => {
            this.loadingIds.update(pre => pre.filter(_id => _id !== id));
            this.snackbar.error((error && error.detail) ?? error);
          },
          next: () => {
            this.loadingIds.update(pre => pre.filter(_id => _id !== id));
            this.snackbar.success('تم حذف الحضور بنجاح');
            this.search$.next(this.search$.value);
          },
        });
      },
    });
  }

  search() {
    this.search$.next(this.searchForm.value);
  }
}

interface SearchFormValue {
  studentName?: string;
  startDate?: Date;
  endDate?: Date;
  category?: number;
  masjed?: 1 | 2 | 3;
}
