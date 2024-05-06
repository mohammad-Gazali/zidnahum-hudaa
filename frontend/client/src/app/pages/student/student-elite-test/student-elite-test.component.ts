import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { StudentComponent } from '../student.component';
import { MemoItemType } from '../../../constants/memo-item.enum';

@Component({
  selector: 'app-student-elite-test',
  standalone: true,
  imports: [MatCard, MatDivider],
  templateUrl: './student-elite-test.component.html',
  styleUrl: './student-elite-test.component.scss'
})
export class StudentEliteTestComponent {
  public student = inject(StudentComponent).student;

  MemoItemType = MemoItemType;
}
