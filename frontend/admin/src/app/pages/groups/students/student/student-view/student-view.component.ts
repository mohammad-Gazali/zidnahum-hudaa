import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-student-view',
  standalone: true,
  imports: [],
  templateUrl: './student-view.component.html',
  styleUrl: './student-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentViewComponent {

}
