import { Pipe, PipeTransform } from '@angular/core';
import { MessageType } from '@shared';

@Pipe({
  name: 'messageType',
  standalone: true,
})
export class MessageTypePipe implements PipeTransform {
  transform(value: MessageType): string {
    switch (value) {
      case MessageType.Memo: return 'تسميع غيباً';
      case MessageType.Test: return 'سبر';
      case MessageType.AlNawawia: return 'الأربعين النووية';
      case MessageType.AlSaalihin: return 'رياض الصالحين';
      case MessageType.AllahNames: return 'أسماء الله الحسنى';
      case MessageType.Parts: return 'سبر الأحزاب';
      case MessageType.Viewing: return 'سرد القرآن نظراً'
    }
  }
}
