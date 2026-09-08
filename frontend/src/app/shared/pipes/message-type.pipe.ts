import { Pipe, PipeTransform } from '@angular/core';
import { MessageTypeEnum } from '../services/api/models';
import { MESSAGE_TYPE_LABELS } from '../constants/labels.const';

@Pipe({
  name: 'messageType',
  standalone: true,
})
export class MessageTypePipe implements PipeTransform {
  transform(value: MessageTypeEnum | undefined): string {
    return MESSAGE_TYPE_LABELS[value as MessageTypeEnum] ?? '';
  }
}
