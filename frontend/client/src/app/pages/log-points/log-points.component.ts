import { Component, DestroyRef, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  ConfirmationService,
  LayoutService,
  MasjedPipe,
  PointsAddingList,
  PointsService,
  SnackbarService
} from '@shared';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { BehaviorSubject, map, switchMap, tap, combineLatest } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-log-points',
  standalone: true,
  imports: [
    DatePipe,
    MasjedPipe,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatChip,
    MatIcon,
    MatMiniFabButton,
    MatDivider
  ],
  templateUrl: './log-points.component.html',
  styleUrl: './log-points.component.scss'
})
export class LogPointsComponent {
  private points = inject(PointsService);
  private confirmation = inject(ConfirmationService);
  private destroyRef = inject(DestroyRef);
  private snackbar = inject(SnackbarService);
  protected loading = inject(LayoutService).loading;

  private page$ = new BehaviorSubject(1);
  private refresh$ = new BehaviorSubject(null);
  private messages$ = combineLatest([
    this.page$,
    this.refresh$,
  ]).pipe(
    tap(() => this.loading.set(true)),
    switchMap(([page, _]) => {
      return this.points.pointsAddingList(page);
    }),
    tap(res => {
      this.hasPrevious.set(Boolean(res.previous));
      this.hasNext.set(Boolean(res.next));
      this.loading.set(false);
    }),
    map(res => res.results),
  );

  protected hasNext = signal(false);
  protected hasPrevious = signal(false);
  protected loadingIds = signal<number[]>([]);
  protected messages = toSignal<PointsAddingList[]>(this.messages$, {
    initialValue: [] as any,
  });
  protected causesMap = toSignal<Map<number, string>>(
    this.points.pointsAddingCauseList().pipe(
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
      message: 'هل أنت متأكد من حذف إضافة النقاط ؟',
      onConfirm: () => {
        this.loadingIds.update(pre => [...pre, id]);
        this.points.pointsAddingDelete(id).pipe(
          takeUntilDestroyed(this.destroyRef),
        ).subscribe({
          error: ({ error }) => {
            this.loadingIds.update(pre => pre.filter(_id => _id !== id));
            this.snackbar.error((error && error.detail) ?? error);
          },
          next: () => {
            this.loadingIds.update(pre => pre.filter(_id => _id !== id));
            this.snackbar.success('تم حذف الإضافة بنجاح');
            this.refresh$.next(null);
          },
        });
      },
    });
  }
}
