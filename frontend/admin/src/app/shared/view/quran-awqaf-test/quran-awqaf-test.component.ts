import { Component, input } from '@angular/core';
import { MemoItemType } from '../../../services/quran/quran.constatns';

@Component({
  selector: 'app-quran-awqaf-test',
  standalone: true,
  imports: [],
  templateUrl: './quran-awqaf-test.component.html',
  styleUrl: './quran-awqaf-test.component.scss'
})
export class QuranAwqafTestComponent {
  public content = input.required<MemoItemType[]>();
  public editMode = input.required<boolean>();
}
