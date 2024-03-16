import { Component, computed, inject, input } from '@angular/core';
import { MemoItemType } from '../../../services/quran/quran.constatns';
import { ControlContainer, FormArray, FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { QuranTestService } from '../../../services/quran/quran-test.service';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-quran-test',
  standalone: true,
  imports: [MatCardModule, MatRippleModule, ReactiveFormsModule],
  templateUrl: './quran-test.component.html',
  styleUrl: './quran-test.component.scss',
  viewProviders:[{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class QuranTestComponent {
  public test = inject(QuranTestService);

  public array = input.required<FormArray<FormControl<MemoItemType>>>();
  public editMode = input.required<boolean>();
  public name = input.required<string>();

  public splittedControlsArray = computed(() => {
    return this.test.spliteArray(this.array().controls);
  });

  public MemoItemType = MemoItemType;

  public changeValue(control: FormControl<MemoItemType>) {
    if (this.editMode()) {
      const preValue = control.value;
      control.setValue((preValue + 1) % 3);
    }
  }
}
