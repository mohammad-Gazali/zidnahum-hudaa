import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCard } from '@angular/material/card';
import { StudentComponent } from '../student.component';
import { MatDivider } from '@angular/material/divider';
import { MemoItemType } from '../../../constants/memo-item.enum';
import { AwqafService } from '../../../services/api/services';
import { AwqafRelation } from '../../../services/api/models';

@Component({
  selector: 'app-student-awqaf-test',
  standalone: true,
  imports: [MatCard, MatDivider],
  templateUrl: './student-awqaf-test.component.html',
  styleUrl: './student-awqaf-test.component.scss'
})
export class StudentAwqafTestComponent {
  private awqaf = inject(AwqafService);
  public student = inject(StudentComponent).student;

  public awqafTestNoQ = toSignal(this.awqaf.awqafTestNoQList());

  MemoItemType = MemoItemType;

  containsNewRelation(relations: AwqafRelation[], id: number): boolean {
    return relations.some(rel => rel.test === id && !rel.is_old);
  }

  containsOldRelation(relations: AwqafRelation[], id: number): boolean {
    return relations.some(rel => rel.test === id && rel.is_old);
  }
}
