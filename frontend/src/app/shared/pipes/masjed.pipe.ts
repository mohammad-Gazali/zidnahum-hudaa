import { Pipe, PipeTransform } from '@angular/core';
import { Masjed } from '../enums';
import { MASJED_LABELS } from '../constants/labels.const';

@Pipe({
  standalone: true,
  name: 'masjed',
})
export class MasjedPipe implements PipeTransform {
  transform(value: Masjed): string {
    return MASJED_LABELS[value];
  }
}
