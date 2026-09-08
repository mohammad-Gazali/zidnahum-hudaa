import { Pipe, PipeTransform } from '@angular/core';
import { StudentLevelEnum } from '../services/api/models';
import { STUDENT_LEVEL_LABELS } from '../constants/labels.const';

@Pipe({
  name: 'level',
  standalone: true,
})
export class LevelPipe implements PipeTransform {
  transform(value: StudentLevelEnum): string {
    return STUDENT_LEVEL_LABELS[value] ?? '';
  }
}
