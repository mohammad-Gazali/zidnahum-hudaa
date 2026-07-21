import { Pipe, PipeTransform } from '@angular/core';
import { Masjed } from '../types';

@Pipe({
  standalone: true,
  name: 'masjed',
})
export class MasjedPipe implements PipeTransform {
  transform(value: Masjed): string {
    switch (value) {
      case Masjed.AlHussinin:
        return 'الحسنين';
      case Masjed.AlSalam:
        return 'السلام';
      case Masjed.AlQazzaz:
        return 'القزاز';
      case Masjed.AlKhansaa:
        return 'الخنساء';
    }
  }
}
