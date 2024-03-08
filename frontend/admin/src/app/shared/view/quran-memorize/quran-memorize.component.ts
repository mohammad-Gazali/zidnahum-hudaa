import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MemoItemType } from '../../../services/quran/quran.constatns';
import { QuranMemorzieService } from '../../../services/quran/quran-memorize.service';
import {
  ControlContainer,
  FormArray,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-quran-memorize',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatRippleModule],
  templateUrl: './quran-memorize.component.html',
  styleUrl: './quran-memorize.component.scss',
  viewProviders:[{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class QuranMemorizeComponent {
  public transform = inject(QuranMemorzieService).transform;

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
