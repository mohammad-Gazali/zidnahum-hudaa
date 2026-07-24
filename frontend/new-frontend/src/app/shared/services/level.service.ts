import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { StudentLevel } from '../types/student-level.enum';
import { STUDENT_LEVEL_LABELS } from '../constants/labels.const';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  getLevels() {
    return of(
      Object.values(StudentLevel)
        .filter((v): v is StudentLevel => typeof v === 'number')
        .map((id) => ({ id, name: STUDENT_LEVEL_LABELS[id] })),
    );
  }
}
