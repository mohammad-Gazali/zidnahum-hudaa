import { Component, input } from '@angular/core';
import { MemoItemType } from '../../../services/quran/quran.constatns';

@Component({
  selector: 'app-quran-test',
  standalone: true,
  imports: [],
  templateUrl: './quran-test.component.html',
  styleUrl: './quran-test.component.scss'
})
export class QuranTestComponent {
  public content = input.required<MemoItemType[]>();
  public editMode = input.required<boolean>();

}
