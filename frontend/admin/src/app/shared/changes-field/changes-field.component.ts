import { Component, inject, input } from '@angular/core';
import { QuranMemorzieService } from '../../services/quran/quran-memorize.service';
import { QuranTestService } from '../../services/quran/quran-test.service';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-changes-field',
  standalone: true,
  imports: [MatCard],
  templateUrl: './changes-field.component.html',
  styleUrl: './changes-field.component.scss'
})
export class ChangesFieldComponent {
  public memorize = inject(QuranMemorzieService);
  public test = inject(QuranTestService);

  public content = input.required<number[]>();
  public type = input.required<1 | 2 | 3 | 4 | 5>();
}
