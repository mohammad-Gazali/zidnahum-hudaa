import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'level',
  standalone: true,
})
export class LevelPipe implements PipeTransform {
  transform(value: 1 | 2 | 3): string {
    switch (value) {
      case 1:
        return 'المستوى الأول';
      case 2:
        return 'المستوى الثاني';
      case 3:
        return 'المستوى الثالث';
    }
  }
}
