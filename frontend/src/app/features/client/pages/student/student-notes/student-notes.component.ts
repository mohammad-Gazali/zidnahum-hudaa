import { Component, DestroyRef, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  AuthService,
  ConfirmationService,
  Group,
  LayoutService,
  MemorizeNotesGet,
  SnackbarService,
  StudentDetails,
  StudentsService,
} from '@shared';
import { StudentComponent } from '../student.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface StudentWithMemoNotes extends StudentDetails {
  memo_notes: MemorizeNotesGet[];
}

@Component({
  selector: 'app-student-notes',
  imports: [MatCard, MatButton, MatIcon, DatePipe],
  templateUrl: './student-notes.component.html',
  styleUrl: './student-notes.component.scss',
})
export class StudentNotesComponent {
  private auth = inject(AuthService);
  private students = inject(StudentsService);
  private destroyRef = inject(DestroyRef);
  private confirmation = inject(ConfirmationService);
  private snackbar = inject(SnackbarService);
  private loading = inject(LayoutService).loading;
  protected student = inject(StudentComponent).student;

  removeNote(id: number) {
    this.confirmation.confirm({
      message: 'هل أنت متأكد من حذف هذه الملاحظة ؟',
      onConfirm: () => {
        this.loading.set(true);

        this.students
          .studentsMemorizeNotesDestroy(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            error: ({ error }: HttpErrorResponse) => {
              this.loading.set(false);
              this.snackbar.error((error && error.detail) ?? error);
            },
            next: () => {
              this.loading.set(false);
              this.snackbar.success('تم الحذف الملاحظة بنجاح');
              this.student.update((pre) => {
                if (!pre) return pre;

                const full = pre as StudentWithMemoNotes;

                return {
                  ...full,
                  memo_notes: full.memo_notes.filter((n) => n.id !== id),
                } as StudentWithMemoNotes;
              });
            },
          });
      },
    });
  }

  hasGroup(): boolean {
    const user = this.auth.currentUser();

    if (!user) return false;
    if (user.isAdmin) return true;

    return user.groups.indexOf(Group.Memo) !== -1;
  }
}
