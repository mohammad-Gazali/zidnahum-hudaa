import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'masjed',
})
export class MasjedPipe implements PipeTransform {
  transform(value: 1 | 2 | 3): string {
    switch (value) {
      case 1:
        return 'الحسنين';
      case 2:
        return 'السلام';
      case 3:
        return 'القزاز';
    }
  }
}
