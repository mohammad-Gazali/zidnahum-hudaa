import { Component, inject, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MemoItemType } from '@shared';
import { StudentComponent } from '../student.component';

@Component({
  selector: 'app-student-test',
  standalone: true,
  imports: [MatCard, MatDivider],
  templateUrl: './student-test.component.html',
  styleUrl: './student-test.component.scss'
})
export class StudentTestComponent {
  public student = inject(StudentComponent).student;

  public testArray = signal<MemoItemType[][][]>([]);

  MemoItemType = MemoItemType;

  constructor() {
    const array = (this.student()?.q_test as MemoItemType[]) ?? []

    for (let i = 0; i < array.length; i += 8) {
      const currentBigChunk: MemoItemType[][] = [];

      const chunk = array.slice(i, i + 8);

      currentBigChunk.push(chunk.slice(0, 4));
      currentBigChunk.push(chunk.slice(4));

      this.testArray.update(pre => [...pre, currentBigChunk])
    }
  }
}
