import { Component, inject, input } from '@angular/core';
import { MemoItemType } from '../../../services/quran/quran.constatns';
import { ControlContainer, FormArray, FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { QuranAwqafTestService } from '../../../services/quran/quran-awqaf-test.service';

@Component({
    selector: 'app-quran-awqaf-test',
    imports: [MatCardModule, MatRippleModule, ReactiveFormsModule],
    templateUrl: './quran-awqaf-test.component.html',
    styleUrl: './quran-awqaf-test.component.scss',
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class QuranAwqafTestComponent {
  public transform = inject(QuranAwqafTestService).transform;
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
