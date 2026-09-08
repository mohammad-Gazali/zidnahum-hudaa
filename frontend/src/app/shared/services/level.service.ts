import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { StudentLevelEnum } from './api/models';
import { STUDENT_LEVEL_LABELS } from '../constants/labels.const';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  getLevels() {
    return of(
      Object.values(StudentLevelEnum)
        .filter((v): v is StudentLevelEnum => typeof v === 'number')
        .map((id) => ({ id, name: STUDENT_LEVEL_LABELS[id] })),
    );
  }
}