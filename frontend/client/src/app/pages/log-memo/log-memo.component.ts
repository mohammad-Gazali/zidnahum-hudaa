import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  ConfirmationService,
  LayoutService,
  MemoPipe,
  MemorizeMessage,
  MessageType,
  MessageTypePipe,
  SnackbarService,
  StudentsService,
  TestPipe
} from '@shared';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, map, switchMap, tap } from 'rxjs';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatChip } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-log-memo',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatChip,
    MatDivider,
    MatIcon,
    DatePipe,
    MessageTypePipe,
    MemoPipe,
    TestPipe,
    MatMiniFabButton,
    MatButton,
  ],
  templateUrl: './log-memo.component.html',
  styleUrl: './log-memo.component.scss'
})
export class LogMemoComponent {
  private students = inject(StudentsService);
  private confirmation = inject(ConfirmationService);
  private destroyRef = inject(DestroyRef);
  private snackbar = inject(SnackbarService);
  public loading = inject(LayoutService).loading;

  private page$ = new BehaviorSubject(1);
  private refresh$ = new BehaviorSubject(null);
  private messages$ = combineLatest([
    this.refresh$,
    this.page$,
  ]).pipe(
    tap(() => this.loading.set(true)),
    switchMap(([_, page]) => {
      return this.students.studentsMemorizeMessageList(page)
    }),
    tap(res => {
      this.hasPrevious.set(Boolean(res.previous));
      this.hasNext.set(Boolean(res.next));
      this.loading.set(false);
    }),
    map(res => res.results),
  );

  protected messageType = MessageType;
  protected hasNext = signal(false);
  protected hasPrevious = signal(false);
  protected loadingIds = signal<number[]>([]);
  protected messages = toSignal<MemorizeMessage[]>(this.messages$, {
    initialValue: [] as any,
  });

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
      message: 'هل أنت متأكد من حذف التسميع للطالب ؟',
      onConfirm: () => {
        this.loadingIds.update(pre => [...pre, studentId]);
        this.students.studentsMemorizeMessageDelete(studentId).pipe(
          takeUntilDestroyed(this.destroyRef),
        ).subscribe({
          error: ({ error }) => {
            this.loadingIds.update(pre => pre.filter(id => id !== studentId));
            this.snackbar.error((error && error.detail) ?? error);
          },
          next: () => {
            this.loadingIds.update(pre => pre.filter(id => id !== studentId));
            this.snackbar.success('تم حذف التسميع بنجاح');
            this.refresh$.next(null);
          },
        })
      },
    })
  }
}
