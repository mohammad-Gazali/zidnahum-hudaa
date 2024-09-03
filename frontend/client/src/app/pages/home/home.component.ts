import { Component, computed, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { AuthService, Group, LayoutService, MasjedPipe, StudentsService } from '@shared';
import { HomeStudentListService } from './home-student-list.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMemorizeNoteDialogComponent } from './add-memorize-note-dialog/add-memorize-note-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatIcon,
    MatCard,
    MatDivider,
    DatePipe,
    MasjedPipe,
    RouterLink,
  ],
})
export class HomeComponent {
  private students = inject(StudentsService);
  private destroyRef = inject(DestroyRef);
  private list = inject(HomeStudentListService);
  private auth = inject(AuthService);
  private dialog = inject(MatDialog);
  public loading = inject(LayoutService).loading;

  constructor() {
    this.destroyRef.onDestroy(() => this.loading.set(false))
  }

  public response = this.list.lastResponse;
  public searchForm = this.list.searchForm;
  public submitted = computed(() => this.response() !== undefined);
  public hasMemoGroup = computed(() => {
    const user = this.auth.currentUser();
    if (!user) return false;
    if (user.isAdmin) return true;

    return user.groups.indexOf(Group.Memo) !== -1
  })

  submit() {
    if (!this.searchForm.value.search) return;

    this.getStudents();
  }

  getStudents(url?: string) {
    const params = new URLSearchParams(url?.split('?')[1]);

    const query = params.get('query') ?? this.searchForm.value.search;
    const page = Number(params.get('page')) || 1;

    this.loading.set(true);

    this.students
      .studentsList({
        query,
        page,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        error: () => this.loading.set(false),
        next: (res) => {
          this.loading.set(false);
          this.response.set(res);
        },
      });
  }

  openNoteDialog(studentId: number) {
    this.dialog.open(AddMemorizeNoteDialogComponent, {
      data: studentId,
      // maxWidth: '500px',
      width: '80%',
    })
  }
}
