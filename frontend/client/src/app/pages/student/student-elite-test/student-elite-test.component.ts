import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MemoItemType } from '@shared';
import { StudentComponent } from '../student.component';

@Component({
  selector: 'app-student-elite-test',
  standalone: true,
  imports: [MatCard, MatDivider],
  templateUrl: './student-elite-test.component.html',
  styleUrl: './student-elite-test.component.scss'
})
export class StudentEliteTestComponent {
  protected student = inject(StudentComponent).student;

  MemoItemType = MemoItemType;
}
