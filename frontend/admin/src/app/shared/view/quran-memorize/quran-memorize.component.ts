import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MemoItemType } from '../../../services/quran/quran.constatns';
import { QuranMemorzieService } from '../../../services/quran/quran-memorize.service';

@Component({
  selector: 'app-quran-memorize',
  standalone: true,
  imports: [MatCardModule, MatRippleModule],
  templateUrl: './quran-memorize.component.html',
  styleUrl: './quran-memorize.component.scss'
})
export class QuranMemorizeComponent {
  public transform = inject(QuranMemorzieService).transform;

  public content = input.required<MemoItemType[]>();
  public editMode = input.required<boolean>();

  public MemoItemType = MemoItemType;
}
