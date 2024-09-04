import { Component, inject, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { merge } from 'rxjs';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MemoPipe, SnackbarService } from '@shared';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-memo-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInput,
    MatIcon,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatCheckbox,
    MatButton,
    MemoPipe
  ],
  templateUrl: './memo-form.component.html',
  styleUrl: './memo-form.component.scss'
})
export class MemoFormComponent {
  private fb = inject(NonNullableFormBuilder);
  private snackbar = inject(SnackbarService);

  protected onSubmit = output<MemoSubmit>();

  protected fromToError = signal(false);

  protected form = this.fb.group({
    single: this.fb.control<number | null>(null),
    from: this.fb.control<number | null>(null, []),
    to: this.fb.control<number | null>(null, []),
    exact: this.fb.array<boolean[]>(Array(37).fill(false)),
  });

  constructor() {
    merge(
      this.form.controls.from.valueChanges,
      this.form.controls.to.valueChanges,
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        const from = this.form.controls.from.value;
        const to = this.form.controls.to.value;

        if (!this.fromToError() && (!from || !to)) return;

        this.fromToError.set(from! >= to!);
      });
  }

  protected submit() {
    if (this.form.invalid) return;

    const formValue = this.form.getRawValue();

    const exact = formValue.exact
      .map((val, index) => [val, index] as const)
      .filter(v => v[0])
      .map(v => v[1] + 582)

    if (
      formValue.single === null &&
      (formValue.from === null || formValue.to === null) &&
      (exact.length === 0)
    ) {
      this.snackbar.error('يجب أن تقوم بإضافة التسميع قبل إضافته');
      return;
    }

    this.onSubmit.emit({
      ...formValue,
      exact,
    });
  }
}

export interface MemoSubmit {
  single: number | null;
  from: number | null;
  to: number | null;
  exact: number[];
}
