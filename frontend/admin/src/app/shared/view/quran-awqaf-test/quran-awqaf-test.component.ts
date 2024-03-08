import { Component, input } from '@angular/core';
import { MemoItemType } from '../../../services/quran/quran.constatns';
import { ControlContainer, FormArray, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-quran-awqaf-test',
  standalone: true,
  imports: [],
  templateUrl: './quran-awqaf-test.component.html',
  styleUrl: './quran-awqaf-test.component.scss',
  viewProviders:[{ provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class QuranAwqafTestComponent {
  public array = input.required<FormArray<FormControl<MemoItemType>>>();
  public editMode = input.required<boolean>();
  public name = input.required<string>();
}
