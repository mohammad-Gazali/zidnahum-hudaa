import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MemoItemType, AwqafService, AwqafRelation } from '@shared';
import { StudentComponent } from '../student.component';

@Component({
  selector: 'app-student-awqaf-test',
  standalone: true,
  imports: [MatCard, MatDivider],
  templateUrl: './student-awqaf-test.component.html',
  styleUrl: './student-awqaf-test.component.scss'
})
export class StudentAwqafTestComponent {
  private awqaf = inject(AwqafService);
  protected student = inject(StudentComponent).student;

  protected awqafTestNoQ = toSignal(this.awqaf.awqafTestNoQList());

  MemoItemType = MemoItemType;

  containsNewRelation(relations: AwqafRelation[], id: number): boolean {
    return relations.some(rel => rel.test === id && !rel.is_old);
  }

  containsOldRelation(relations: AwqafRelation[], id: number): boolean {
    return relations.some(rel => rel.test === id && rel.is_old);
  }
}
