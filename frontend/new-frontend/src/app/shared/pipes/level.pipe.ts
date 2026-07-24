import { Pipe, PipeTransform } from '@angular/core';
import { StudentLevel } from '../enums';
import { STUDENT_LEVEL_LABELS } from '../constants/labels.const';

@Pipe({
  name: 'level',
  standalone: true,
})
export class LevelPipe implements PipeTransform {
  transform(value: StudentLevel): string {
    return STUDENT_LEVEL_LABELS[value];
  }
}
