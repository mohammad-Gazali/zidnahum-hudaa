import { Pipe, PipeTransform } from '@angular/core';
import { StudentLevel } from '../types';

@Pipe({
  name: 'level',
  standalone: true,
})
export class LevelPipe implements PipeTransform {
  transform(value: StudentLevel): string {
    switch (value) {
      case StudentLevel.ONE:
        return 'المستوى الأول';
      case StudentLevel.TWO:
        return 'المستوى الثاني';
      case StudentLevel.THREE:
        return 'المستوى الثالث';
    }
  }
}
