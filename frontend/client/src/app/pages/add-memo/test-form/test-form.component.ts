import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss'
})
export class TestFormComponent {
  private fb = inject(NonNullableFormBuilder);

  public onSubmit = output<TestSubmit>();

  private form = this.fb.group({
    type: this.fb.control<'quarter' | 'half' | 'whole'>('quarter', [Validators.required]),
    part: this.fb.control<number | undefined>(undefined, [Validators.required]),
    extra: this.fb.control<1 | 2 | 3 | 4>(1, [Validators.required]),
  });

  submit() {
    if (this.form.invalid) return;

    this.onSubmit.emit(this.form.getRawValue() as TestSubmit);
  }
}

export interface TestSubmit {
  type: 'quarter' | 'half' | 'whole';
  part: number;
  extra: 1 | 2 | 3 | 4;
}
