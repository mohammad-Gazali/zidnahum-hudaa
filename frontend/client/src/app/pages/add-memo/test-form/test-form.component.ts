import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCard } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCard,
    MatRippleModule,
    MatInput,
    MatButton,
    MatIcon,
  ],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss'
})
export class TestFormComponent {
  private fb = inject(NonNullableFormBuilder);

  public onSubmit = output<TestSubmit>();

  protected form = this.fb.group({
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
