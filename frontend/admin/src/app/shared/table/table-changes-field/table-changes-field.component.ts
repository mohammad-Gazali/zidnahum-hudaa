import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { QuranMemorzieService } from '../../../services/quran/quran-memorize.service';
import { QuranTestService } from '../../../services/quran/quran-test.service';

@Component({
  selector: 'app-table-changes-field',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './table-changes-field.component.html',
  styleUrl: './table-changes-field.component.scss'
})
export class TableChangesFieldComponent {
  public memorize = inject(QuranMemorzieService);
  public test = inject(QuranTestService);

  public content = input.required<number[]>();
  public type = input.required<1 | 2 | 3 | 4 | 5>();
}
