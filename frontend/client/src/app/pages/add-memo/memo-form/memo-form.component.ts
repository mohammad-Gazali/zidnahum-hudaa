import { Component, inject, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-memo-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInput
  ],
  templateUrl: './memo-form.component.html',
  styleUrl: './memo-form.component.scss'
})
export class MemoFormComponent {
  private fb = inject(NonNullableFormBuilder);

  public onSubmit = output<MemoSubmit>();

  protected form = this.fb.group({
    single: this.fb.control<number | undefined>(undefined, [
      Validators.min(1),
      Validators.max(581),
    ]),
    from: this.fb.control<number | undefined>(undefined, [
      Validators.min(1),
      Validators.max(580),
    ]),
    to: this.fb.control<number | undefined>(undefined, [
      Validators.min(2),
      Validators.max(581),
    ]),
    exact: this.fb.control<number[]>([]),
  });

  protected submit() {
    if (this.form.invalid) return;

    this.onSubmit.emit(this.form.getRawValue());
  }
}

export interface MemoSubmit {
  single: number | undefined;
  from: number | undefined;
  to: number | undefined;
  exact: number[];
}
