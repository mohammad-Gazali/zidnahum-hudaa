import { Component, DestroyRef, inject, input, model, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { finalize } from 'rxjs';
import { StudentsService } from '../../services/api/admin/services';
import { SearchStudent } from './search-student.interface';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MasjedService } from '../../services/masjed.service';

@Component({
  selector: 'app-student-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule,
    TranslatePipe,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        subscriptSizing: 'dynamic'
      },
    },
  ],
  templateUrl: './student-search.component.html',
  styleUrl: './student-search.component.scss',
})
export class StudentSearchComponent {
  private studetns = inject(StudentsService);
  private destroyRef = inject(DestroyRef);
  private fb = inject(NonNullableFormBuilder);
  public masjed = inject(MasjedService);

  public students = signal<SearchStudent[]>([]);

  public selectedStudents = model<Set<SearchStudent>>();
  public studentChoose = output<SearchStudent>();
  public removeResultOnChoose = input<boolean>();

  public loading = signal(false);
  public form = this.fb.group({
    search: this.fb.control(''),
  });

  clear() {
    this.students.set([]);
  }

  submit() {
    if (this.form.valid && !this.loading()) {
      this.loading.set(true);
      this.form.controls.search.disable();

      this.studetns
        .studentsStudentList({
          name: this.form.value.search,
        })
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => {
            this.loading.set(false);
            this.form.controls.search.enable();
          })
        )
        .subscribe((res) => {
          this.students.set(res.results);
          this.form.reset();
        });
    }
  }

  choose(student: SearchStudent) {
    this.studentChoose.emit(student);
    this.selectedStudents.update((pre) => new Set([...(pre ?? []), student]));

    if (this.removeResultOnChoose()) {
      this.clear();
    }
  }
}
