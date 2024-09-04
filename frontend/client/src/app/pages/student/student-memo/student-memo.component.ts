import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MemoPipe, MemoItemType } from '@shared';
import { StudentComponent } from '../student.component';

@Component({
  selector: 'app-student-memo',
  standalone: true,
  imports: [MatCard, MatDivider, MemoPipe],
  templateUrl: './student-memo.component.html',
  styleUrl: './student-memo.component.scss'
})
export class StudentMemoComponent {
  protected student = inject(StudentComponent).student;

  MemoItemType = MemoItemType;
}
