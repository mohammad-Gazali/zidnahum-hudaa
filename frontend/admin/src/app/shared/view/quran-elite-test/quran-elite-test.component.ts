import { Component, inject, input } from '@angular/core';
import { ControlContainer, FormArray, FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { QuranEliteTestService } from '../../../services/quran/quran-elite-test.service';
import { MemoItemType } from '../../../services/quran/quran.constatns';

@Component({
  selector: 'app-quran-elite-test',
  standalone: true,
  imports: [MatCardModule, MatRippleModule, ReactiveFormsModule],
  templateUrl: './quran-elite-test.component.html',
  styleUrl: './quran-elite-test.component.scss',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class QuranEliteTestComponent {
  public transform = inject(QuranEliteTestService).transform;
  public array = input.required<FormArray<FormControl<MemoItemType>>>();
  public editMode = input.required<boolean>();
  public name = input.required<string>();

  public MemoItemType = MemoItemType;

  public changeValue(control: FormControl<MemoItemType>) {
    if (this.editMode()) {
      const preValue = control.value;
      control.setValue((preValue + 1) % 3);
    }
  }
}
