import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { StudentComponent } from '../student.component';
import { MemoPipe } from '../../../pipes/memo.pipe';
import { MemoItemType } from '../../../constants/memo-item.enum';

@Component({
  selector: 'app-student-memo',
  standalone: true,
  imports: [MatCard, MatDivider, MemoPipe],
  templateUrl: './student-memo.component.html',
  styleUrl: './student-memo.component.scss'
})
export class StudentMemoComponent {
  public student = inject(StudentComponent).student;
  MemoItemType = MemoItemType;
}
