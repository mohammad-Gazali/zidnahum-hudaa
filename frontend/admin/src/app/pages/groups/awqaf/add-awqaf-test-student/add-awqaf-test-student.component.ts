import { Component, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCard } from '@angular/material/card';
import { MatChipRow, MatChipRemove } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import {
  MatRadioGroup,
  MatRadioButton,
  MatRadioChange,
} from '@angular/material/radio';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatFormField, MatLabel, MatError, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { StudentSearchComponent } from '../../../../shared/student-search/student-search.component';
import { SearchStudent } from '../../../../shared/student-search/search-student.interface';
import { AwqafService, ExtraService } from '../../../../services/api/admin/services';
import { AwqafTestNoQList } from '../../../../services/api/admin/models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-awqaf-test-student',
  standalone: true,
  imports: [
    MatCard,
    MatChipRow,
    MatChipRemove,
    MatIcon,
    MatRadioGroup,
    MatRadioButton,
    MatSelect,
    MatOption,
    MatFormField,
    MatLabel,
    MatError,
    MatHint,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    StudentSearchComponent,
    TranslatePipe,
  ],
  templateUrl: './add-awqaf-test-student.component.html',
  styleUrl: './add-awqaf-test-student.component.scss',
})
export class AddAwqafTestStudentComponent {
  private awqaf = inject(AwqafService);
  private fb = inject(FormBuilder);
  private extra = inject(ExtraService);

  public selectedStudents = signal<Set<SearchStudent>>(new Set());
  public mode = signal<'quran' | 'non-quran'>('quran');
  public awqafNoQTests = signal<AwqafTestNoQList[]>([]);

  public quranForm = this.fb.group({
    value: this.fb.nonNullable.control(undefined, [
      Validators.required,
      Validators.pattern(/[0-9 ]+/g),
    ]),
  });

  public nonQuranForm = this.fb.group({
    value: this.fb.nonNullable.control(undefined, [
      Validators.required,
    ])
  });

  constructor() {
    this.awqaf
      .awqafTestNoQList()
      .pipe(takeUntilDestroyed())
      .subscribe((res) => this.awqafNoQTests.set(res));
  }

  removeStudent(student: SearchStudent) {
    this.selectedStudents.update(
      (pre) => new Set([...pre].filter((s) => s.id !== student.id))
    );
  }

  radioChange(change: MatRadioChange) {
    this.mode.set(change.value);
  }

  submitNoQ() {
    if (!this.nonQuranForm.valid) return;
    // TODO: not working continue from here
    this.extra.extraAddAwqafNoQTestCreate({
      students: [...this.selectedStudents()].map(s => s.id),
      test: this.nonQuranForm.value.value ?? -1,
    })
  }
}
