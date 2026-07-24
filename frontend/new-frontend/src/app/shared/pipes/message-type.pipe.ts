import { Pipe, PipeTransform } from '@angular/core';
import { MessageType } from '../types';
import { MESSAGE_TYPE_LABELS } from '../constants/labels.const';

@Pipe({
  name: 'messageType',
  standalone: true,
})
export class MessageTypePipe implements PipeTransform {
  transform(value: MessageType): string {
    return MESSAGE_TYPE_LABELS[value];
  }
}
