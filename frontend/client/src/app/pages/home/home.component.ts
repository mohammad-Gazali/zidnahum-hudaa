import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { LayoutService, MasjedPipe, StudentList, StudentsService } from '@shared';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    FormsModule,
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
  public loading = inject(LayoutService).loading;

  public response = signal<
    | {
    count: number;
    next?: string | null | undefined;
    previous?: string | null | undefined;
    results: StudentList[];
  }
    | undefined
  >(undefined);
  public submitted = signal(false);

  public search = '';

  submit() {
    if (!this.search) return;

    this.getStudents();
  }

  getStudents(url?: string) {
    const params = new URLSearchParams(url?.split('?')[1]);

    const query = params.get('query') ?? this.search;
    const page = Number(params.get('page')) || 1;

    this.submitted.set(true);
    this.loading.set(true);

    this.students
      .studentsList({
        query,
        page,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe((res) => this.response.set(res));
  }
}
