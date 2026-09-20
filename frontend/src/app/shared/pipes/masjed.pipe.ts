import { Pipe, PipeTransform } from '@angular/core';
import { MasjedEnum } from '../services/api/models';
import { MASJED_LABELS } from '../constants/labels.const';

@Pipe({
  standalone: true,
  name: 'masjed',
})
export class MasjedPipe implements PipeTransform {
  transform(value: MasjedEnum): string {
    return MASJED_LABELS[value] ?? '';
  }
}
